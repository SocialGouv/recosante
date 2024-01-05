import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Arrow() {
  return (
    <Svg width={8} height={12} viewBox="0 0 8 12" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.91 11.589a.833.833 0 010-1.179L5.32 6 .91 1.589A.833.833 0 012.087.41l5 5a.833.833 0 010 1.179l-5 5a.833.833 0 01-1.179 0z"
        fill="#000"
      />
    </Svg>
  );
}
