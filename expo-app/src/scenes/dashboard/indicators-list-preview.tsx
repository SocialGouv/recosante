import { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { IndicatorPreview } from '~/components/indicators/indicator-preview';
import { Indicator } from '~/types/indicator';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

interface IndicatorsListPreviewProps {
  indicators: Indicator[] | null;
  favoriteIndicator: Indicator | null;
}

const tabs = [
  { key: 'today', title: "Aujourd'hui" },
  { key: 'tomorow', title: 'Demain' },
];

export function IndicatorsListPreview(props: IndicatorsListPreviewProps) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState(tabs);
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

  function renderTabBar(props: any) {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'black' }}
        labelStyle={{ color: 'black' }}
        style={{
          backgroundColor: '#ECF1FB',
        }}
      />
    );
  }

  function IndicatorListView() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {props.favoriteIndicator ? (
          <IndicatorPreview indicator={props.favoriteIndicator} isFavorite />
        ) : null}
        <View className=" mx-3 flex flex-1  flex-row flex-wrap pb-24">
          {filteredIndicators?.map((indicator) => (
            <IndicatorPreview key={indicator.id} indicator={indicator} />
          ))}
        </View>
      </ScrollView>
    );
  }

  function TodayRoute() {
    return <IndicatorListView />;
  }

  function TomorowRoute() {
    return <IndicatorListView />;
  }

  const renderScene = SceneMap({
    today: TodayRoute,
    tomorow: TomorowRoute,
  });
  return (
    <TabView
      renderTabBar={renderTabBar}
      className="bg-app-gray  flex flex-1 "
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width, height: layout.height }}
    />
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
