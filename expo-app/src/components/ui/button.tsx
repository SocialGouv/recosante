import { Pressable, View } from 'react-native';
import MyText from './my-text';
import type { Fonts } from './my-text';
import { cn } from '~/utils/tailwind';

interface ButtonProps {
  children: string | React.ReactNode;
  font?: Fonts;
  viewClassName?: string;
  textClassName?: string;
  disabled?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
}

export default function Button({
  font = 'MarianneBold',
  children,
  viewClassName = '',
  textClassName = '',
  disabled = false,
  onPress,
  icon,
}: ButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <View
        className={cn(`flex-col justify-center rounded-full px-4
        py-2
        ${disabled ? 'opacity-30' : 'opacity-100'}
        ${icon ? 'flex flex-row' : 'flex-col'} 
        ${viewClassName}`)}
      >
        {icon ? (
          <View className="mr-2 flex justify-center ">{icon}</View>
        ) : null}
        <MyText
          font={font}
          className={` text-center text-xl text-white ${textClassName} border`}
        >
          {children}
        </MyText>
      </View>
    </Pressable>
  );
}
