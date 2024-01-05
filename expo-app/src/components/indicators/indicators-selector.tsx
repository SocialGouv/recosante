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
  closeBottomSheet: () => void;
  setFavoriteIndicator: (indicator: Indicator | null) => void;
  indicators: Indicator[] | null;
  favoriteIndicator: Indicator | null;
}
export function IndicatorsSelector(props: IndicatorsSelectorProps) {
  function handleSelectIndicator(indicator: Indicator) {
    props.setFavoriteIndicator(indicator);
  }
  return (
    <View className="flex  items-start  ">
      {props.indicators?.map((indicator) => {
        const isFavorite = props.favoriteIndicator?.slug === indicator.slug;
        return (
          <Button
            onPress={() => handleSelectIndicator(indicator)}
            viewClassName={cn(
              `${isFavorite ? 'bg-app-yellow' : ''}
               border-white border-2 rounded-full p-4 my-2 `,
            )}
            textClassName="text-white text-md "
            key={indicator.id}
            icon={IndicatorService.getIconBySlug(indicator.slug)}
          >
            {indicator.name}
          </Button>
        );
      })}
      {props.favoriteIndicator ? (
        <View className="mx-auto mt-2">
          <Button
            onPress={() => {
              props.closeBottomSheet();
            }}
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
