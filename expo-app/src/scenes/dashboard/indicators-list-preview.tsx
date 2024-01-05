import { useMemo } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { IndicatorPreview } from '~/components/indicators/indicator-preview';
import { Indicator } from '~/types/indicator';

interface IndicatorsListPreviewProps {
  indicators: Indicator[] | null;
  favoriteIndicator: Indicator | null;
}

export function IndicatorsListPreview(props: IndicatorsListPreviewProps) {
  if (!props.indicators) {
    return null;
  }
  //   Remove the favorite indicator from the list of indicators
  const filteredIndicators = useMemo(
    () =>
      props.indicators?.filter(
        (indicator) => indicator.slug !== props.favoriteIndicator?.slug,
      ),
    [props.indicators, props.favoriteIndicator],
  );
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {props.favoriteIndicator ? (
        <IndicatorPreview indicator={props.favoriteIndicator} isFavorite />
      ) : null}
      <View>
        {filteredIndicators?.map((indicator) => (
          <IndicatorPreview key={indicator.id} indicator={indicator} />
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 20,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
