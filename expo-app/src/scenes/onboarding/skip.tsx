import { View } from 'react-native';
import Button from '~/components/ui/button';

interface SkipProps {
  navigation: any;
  target: number;
}

const PATH = 'SCREEN_';
export function Skip(props: SkipProps) {
  return (
    <View className="absolute top-4 flex w-full justify-end px-2">
      <Button
        onPress={() => {
          props.navigation.navigate(`${PATH}${props.target}`);
        }}
        textClassName="text-right text-white text-sm"
        font="MarianneRegular"
      >
        Skip {'>'}
      </Button>
    </View>
  );
}
