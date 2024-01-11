import { View } from 'react-native';
import Button from '~/components/ui/button';

interface SkipProps {
  onPress: () => void;
}

export function Skip(props: SkipProps) {
  return (
    <View className="absolute top-4 flex w-full justify-end ">
      <Button
        onPress={props.onPress}
        textClassName="text-right text-white text-sm"
        font="MarianneRegular"
      >
        Skip {'>'}
      </Button>
    </View>
  );
}
