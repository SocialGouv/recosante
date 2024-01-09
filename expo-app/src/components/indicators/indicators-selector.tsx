import { View } from 'react-native';
import { useState } from 'react';
import { Indicator } from '~/types/indicator';
import { IndicatorService } from '~/services/indicator';
import { cn } from '~/utils/tailwind';
import { useIndicator } from '~/zustand/indicator/useIndicator';
import Button from '../ui/button';

interface IndicatorsSelectorProps {
  indicators: Indicator[] | null;
  favoriteIndicator: Indicator | null;
  onSubmit: () => void;
}
export function IndicatorsSelector(props: IndicatorsSelectorProps) {
  const [state, setState] = useState<Indicator | null>(props.favoriteIndicator);
  const { setFavoriteIndicator } = useIndicator((state) => state);
  function handleSelectIndicator(indicator: Indicator) {
    setState(indicator);
  }

  function handleSubmit() {
    setFavoriteIndicator(state);
    props.onSubmit();
  }
  return (
    <View className="flex items-start">
      {props.indicators?.map((indicator) => {
        const isFavorite = state?.slug === indicator.slug;
        return (
          <Button
            onPress={() => handleSelectIndicator(indicator)}
            viewClassName={cn(
              `${isFavorite ? 'bg-app-yellow' : ''}
               border-white border-2 rounded-full px-4 py-2 my-2 items-center`,
            )}
            textClassName="text-white text-base"
            key={indicator.slug}
            icon={IndicatorService.getIconBySlug(indicator.slug)}
          >
            {indicator.name}
          </Button>
        );
      })}
      {!!state?.slug && (
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
      )}
    </View>
  );
}
