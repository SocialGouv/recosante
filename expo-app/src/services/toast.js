import React, { useCallback, useRef, useState } from 'react';
import { Animated, View } from 'react-native';

import TextStyled from '../components/TextStyled';

const ViewContext = React.createContext();

export const useToast = () => {
  const context = React.useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

const ToastProvider = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [caption, setCaption] = useState();

  const hide = useCallback(() => setCaption(null), [setCaption]);

  const show = useCallback(
    (caption, timeout = 1500) => {
      const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      };

      const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      };
      setCaption(caption);
      fadeIn();
      setTimeout(() => {
        fadeOut();
        setTimeout(() => {
          setCaption(null);
        }, 150);
      }, timeout);
    },
    [setCaption, fadeAnim]
  );

  return (
    <ViewContext.Provider value={{ hide, show }} {...props}>
      {props.children}
      {Boolean(caption) && (
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="flex flex-row w-full justify-center absolute bottom-11"
          pointerEvents={'box-none'}>
          <View className="bg-[#4030a5] grow-0 rounded-full mb-4 flex w-min px-4	">
            <TextStyled maxFontSizeMultiplier={2} color={'#FFF'} testID="toast" className="text-center py-2">
              {caption}
            </TextStyled>
          </View>
        </Animated.View>
      )}
    </ViewContext.Provider>
  );
};

export default ToastProvider;
