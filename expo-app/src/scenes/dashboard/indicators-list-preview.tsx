import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IndicatorPreview } from '~/components/indicators/indicator-preview';
import { IndicatorItem } from '~/types/indicator';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DayEnum } from '~/types/day';

const Tab = createMaterialTopTabNavigator();

const tabsEnum = {
  TODAY: "Aujourd'hui",
  TOMORROW: 'Demain',
};

interface IndicatorsListPreviewProps {
  indicators: IndicatorItem[] | null;
  favoriteIndicator: IndicatorItem | null;
}
export function IndicatorsListPreview(props: IndicatorsListPreviewProps) {
  //   Remove the favorite indicator from the list of indicators
  const filteredIndicators = useMemo(
    () =>
      props.indicators?.filter(
        (indicator) => indicator.slug !== props.favoriteIndicator?.slug,
      ),
    [props.indicators, props.favoriteIndicator],
  );
  if (!props.indicators) {
    return null;
  }

  function IndicatorListView({ navigation, route }: any) {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {props.favoriteIndicator ? (
          <IndicatorPreview
            day={route.params.day}
            indicator={props.favoriteIndicator}
            isFavorite
          />
        ) : null}
        <View className=" mx-3 flex flex-1  flex-row flex-wrap pb-24">
          {filteredIndicators?.map((indicator) => (
            <IndicatorPreview
              day={route.params.day}
              key={indicator.slug}
              indicator={indicator}
            />
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName={tabsEnum.TODAY}
      screenOptions={{
        tabBarStyle: { backgroundColor: '#ECF1FB' },
        tabBarLabelStyle: { fontWeight: 'bold' },
      }}
    >
      <Tab.Screen
        name={tabsEnum.TODAY}
        component={IndicatorListView}
        initialParams={{ day: DayEnum.TODAY }}
      />
      <Tab.Screen
        name={tabsEnum.TOMORROW}
        component={IndicatorListView}
        initialParams={{ day: DayEnum.TOMORROW }}
      />
    </Tab.Navigator>
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
