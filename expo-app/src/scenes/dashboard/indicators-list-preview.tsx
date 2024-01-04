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
        (indicator) => indicator !== props.favoriteIndicator,
      ),
    [props.indicators, props.favoriteIndicator],
  );
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {props.favoriteIndicator ? (
        <IndicatorPreview indicator={props.favoriteIndicator} isFavorite />
      ) : null}

      <FlatList
        numColumns={2} // set number of columns
        columnWrapperStyle={styles.row} // space them out evenly
        data={filteredIndicators}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <IndicatorPreview indicator={item} key={item.id} />
        )}
      />
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
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
