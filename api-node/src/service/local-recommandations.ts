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

export class LocalRecommandationService {
  private data: LocalRecommandationData;

  constructor() {
    this.data = recommandationData as LocalRecommandationData;
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
    const indicator = row[1] as IndicatorsSlugEnum;
    if (!indicator) return [];

    const indicatorValues = row[5] 
      ? row[5].split(',').map(val => val.trim()).filter(val => val !== '')
      : [];
    
    if (indicatorValues.length === 0) return [];

    const typeWeatherAlert = row[3] || 'N/A';
    const seasons = (row[6] || 'Toute')
      .split(',')
      .map(season => season.trim()) as SeasonEnum[];

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
    
    for (let i = 12; i < row.length; i++) {
      const content = row[i]?.trim();
      if (content && content !== '-') {
        contents.push(content);
      }
    }
    
    return contents;
  }

  async saveRecommandations(recommandations: ParsedRecommandation[]): Promise<void> {
    for (const rec of recommandations) {
      const uniqueKey = this.generateUniqueKey(rec);
      
      try {
        await prisma.recommandation.upsert({
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
      }
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
