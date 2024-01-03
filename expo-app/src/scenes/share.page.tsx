import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '~/components/ui/my-text';

export function SharePage() {
  return (
    <SafeAreaView className="flex flex-1 items-center justify-start bg-app-100">
      <View className="border-b border-gray-300 py-4">
        <MyText font="MarianneExtraBold" className="text-center text-3xl">
          Share
        </MyText>
      </View>
    </SafeAreaView>
  );
}
