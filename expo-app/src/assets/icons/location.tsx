import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function LocationIcon() {
  return (
    <Svg width={19} height={19} viewBox="0 0 19 19" fill="none">
      <Path
        d="M15 4L5 8.722l4.167 1.39L10.277 14 15 4z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
}
