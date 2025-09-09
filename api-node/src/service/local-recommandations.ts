import type { SeasonEnum, IndicatorsSlugEnum } from '@prisma/client';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';
import recommandationData from './recommandation.json';

type LocalRecommandationData = {
  range: string;
  majorDimension: 'ROWS';
  values: string[][];
};

type ParsedRecommandation = {
  indicator: IndicatorsSlugEnum;
  indicator_value: number;
  type_weather_alert: string;
  seasons: SeasonEnum[];
  recommandation_content: string;
  recommandation_id: string;
};

const VALID_INDICATORS: IndicatorsSlugEnum[] = [
  'indice_atmospheric',
  'indice_uv',
  'pollen_allergy',
  'weather_alert',
  'bathing_water',
  'drinking_water'
];

const VALID_SEASONS: SeasonEnum[] = [
  'Printemps',
  'Ete',
  'Automne',
  'Hiver',
  'Toute'
];

export class LocalRecommandationService {
  private static data: LocalRecommandationData | null = null;
  
  private static readonly COLUMN_INDICES = {
    INDICATOR: 1,
    TYPE_WEATHER_ALERT: 3,
    INDICATOR_VALUES: 5,
    SEASONS: 6,
    RECOMMENDATIONS_START: 12
  } as const;

  constructor() {
    if (!LocalRecommandationService.data) {
      LocalRecommandationService.data = recommandationData as LocalRecommandationData;
    }
  }

  private get data(): LocalRecommandationData {
    if (!LocalRecommandationService.data) {
      throw new Error('Data not initialized. This should not happen.');
    }
    return LocalRecommandationService.data;
  }

  async loadRecommandations(): Promise<ParsedRecommandation[]> {
    const allRecommandations: ParsedRecommandation[] = [];
    
    for (let rowIndex = 1; rowIndex < this.data.values.length; rowIndex++) {
      const row = this.data.values[rowIndex];
      if (!row || row.length === 0) continue;

      try {
        const parsed = this.parseRecommandationRow(row, rowIndex);
        allRecommandations.push(...parsed);
      } catch (error: any) {
        capture(error, { 
          extra: { 
            rowIndex, 
            row: row.slice(0, 10) 
          } 
        });
      }
    }

    return allRecommandations;
  }

  parseRecommandationRow(row: string[], rowIndex: number): ParsedRecommandation[] {
    const indicatorValue = row[LocalRecommandationService.COLUMN_INDICES.INDICATOR];
    if (!indicatorValue || !this.isValidIndicator(indicatorValue)) {
      return [];
    }
    const indicator = indicatorValue as IndicatorsSlugEnum;

    const indicatorValues = row[LocalRecommandationService.COLUMN_INDICES.INDICATOR_VALUES] 
      ? row[LocalRecommandationService.COLUMN_INDICES.INDICATOR_VALUES].split(',').map(val => val.trim()).filter(val => val !== '')
      : [];
    
    if (indicatorValues.length === 0) return [];

    const typeWeatherAlert = row[LocalRecommandationService.COLUMN_INDICES.TYPE_WEATHER_ALERT] || 'N/A';
    const seasons = this.parseSeasons(row[LocalRecommandationService.COLUMN_INDICES.SEASONS] || 'Toute');

    const recommandationContents = this.extractRecommandationContents(row);
    const recommandations: ParsedRecommandation[] = [];

    for (const indicatorValue of indicatorValues) {
      const numericValue = parseInt(indicatorValue, 10);
      if (isNaN(numericValue)) continue;

      for (let recIndex = 0; recIndex < recommandationContents.length; recIndex++) {
        const content = recommandationContents[recIndex];
        if (!content || content === '-') continue;

        const recommandationId = `${rowIndex.toString().padStart(4, '0')}-${recIndex}`;
        
        recommandations.push({
          indicator,
          indicator_value: numericValue,
          type_weather_alert: typeWeatherAlert,
          seasons,
          recommandation_content: content,
          recommandation_id: recommandationId
        });
      }
    }

    return recommandations;
  }

  private extractRecommandationContents(row: string[]): string[] {
    const contents: string[] = [];
    
    for (let i = LocalRecommandationService.COLUMN_INDICES.RECOMMENDATIONS_START; i < row.length; i++) {
      const content = row[i]?.trim();
      if (content && content !== '-') {
        contents.push(content);
      }
    }
    
    return contents;
  }

  private isValidIndicator(value: string): value is IndicatorsSlugEnum {
    return VALID_INDICATORS.includes(value as IndicatorsSlugEnum);
  }

  private parseSeasons(seasonsString: string): SeasonEnum[] {
    const seasons = seasonsString
      .split(',')
      .map(season => season.trim())
      .filter(season => VALID_SEASONS.includes(season as SeasonEnum));
    
    return seasons.length > 0 ? seasons as SeasonEnum[] : ['Toute'];
  }

  async saveRecommandations(recommandations: ParsedRecommandation[]): Promise<void> {
    const operations = recommandations.map(async (rec) => {
      const uniqueKey = this.generateUniqueKey(rec);
      
      try {
        return await prisma.recommandation.upsert({
          where: { unique_key: uniqueKey },
          create: {
            unique_key: uniqueKey,
            recommandation_id: rec.recommandation_id,
            recommandation_content: rec.recommandation_content,
            indicator: rec.indicator,
            indicator_value: rec.indicator_value,
            type_weather_alert: rec.type_weather_alert,
            seasons: rec.seasons,
          },
          update: {
            recommandation_content: rec.recommandation_content,
          },
        });
      } catch (error: any) {
        capture(error, { 
          extra: { 
            recommandation: rec,
            uniqueKey 
          } 
        });
        throw error;
      }
    });
    
    const results = await Promise.allSettled(operations);
    
    const failures = results.filter(result => result.status === 'rejected');
    if (failures.length > 0) {
      console.warn(`${failures.length} recommandations failed to save out of ${recommandations.length}`);
    }
  }

  private generateUniqueKey(rec: ParsedRecommandation): string {
    return [
      rec.recommandation_id,
      rec.indicator,
      rec.indicator_value.toString(),
      rec.type_weather_alert,
      rec.seasons.join('-'),
    ].join('_');
  }

  async syncRecommandations(): Promise<void> {
    try {
      const recommandations = await this.loadRecommandations();
      await this.saveRecommandations(recommandations);
      console.log(`Synchronisé ${recommandations.length} recommandations`);
    } catch (error: any) {
      capture(error, { 
        extra: { 
          context: 'syncRecommandations' 
        } 
      });
      throw error;
    }
  }
}
