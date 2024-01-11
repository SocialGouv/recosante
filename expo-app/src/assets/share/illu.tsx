import * as React from 'react';
import { Image } from 'expo-image';
import { View } from 'react-native';

export function Illu() {
  return (
    <View className="h-1/2 w-10/12">
      <Image
        className="h-full w-full bg-gray-50"
        source={require('./illu.png')}
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
}
