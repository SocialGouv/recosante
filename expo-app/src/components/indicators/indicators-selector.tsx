import { View } from 'react-native';
import MyText from '../ui/my-text';
import Api from '~/services/api';

import { useEffect, useState } from 'react';
import { Indicator } from '~/types/indicator';
import Button from '../ui/button';
import { IndicatorService } from '~/services/indicator';
import { cn } from '~/utils/tailwind';

interface IndicatorsSelectorProps {
  navigation: any;
  setFavoriteIndicator: (indicator: Indicator | null) => void;
  indicators: Indicator[] | null;
  favoriteIndicator: Indicator | null;
  onSubmit: (state: Indicator | null) => void;
}
export function IndicatorsSelector(props: IndicatorsSelectorProps) {
  const [state, setState] = useState<Indicator | null>(props.favoriteIndicator);
  function handleSelectIndicator(indicator: Indicator) {
    setState(indicator);
  }

  function handleSubmit() {
    props.onSubmit(state);
  }
  return (
    <View className="flex  items-start  ">
      {props.indicators?.map((indicator) => {
        const isFavorite = state?.slug === indicator.slug;
        return (
          <Button
            onPress={() => handleSelectIndicator(indicator)}
            viewClassName={cn(
              `${isFavorite ? 'bg-app-yellow' : ''}
               border-white border-2 rounded-full p-4 my-2 `,
            )}
            textClassName="text-white text-md "
            key={indicator.slug}
            icon={IndicatorService.getIconBySlug(indicator.slug)}
          >
            {indicator.name}
          </Button>
        );
      })}
      {state?.slug ? (
        <View className="mx-auto mt-2">
          <Button
            onPress={handleSubmit}
            viewClassName="bg-app-yellow p-4"
            textClassName="text-black"
            font="MarianneMedium"
          >
            C'est parti !
          </Button>
        </View>
      ) : null}
    </View>
  );
}
