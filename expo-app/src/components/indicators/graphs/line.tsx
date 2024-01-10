import { View } from 'react-native';
import MyText from '~/components/ui/my-text';

interface LineChartProps {
  value?: number;
}

export function LineChart(props: LineChartProps) {
  return (
    <View className="flex">
      <View className="h-3 rounded-full bg-[#9DF5F0]"></View>
      <View
        className={`-top-3 flex h-3  rounded-full bg-[#FF797A]`}
        style={{
          width: `${props.value}%`,
        }}
      ></View>
    </View>
  );
}
