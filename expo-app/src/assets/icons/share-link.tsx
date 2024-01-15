import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function ShareLink() {
  return (
    <Svg width={18} height={22} viewBox="0 0 18 22" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.293.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 3.414V14a1 1 0 11-2 0V3.414L5.707 5.707a1 1 0 01-1.414-1.414l4-4zM1 10a1 1 0 011 1v8a1 1 0 001 1h12a1 1 0 001-1v-8a1 1 0 112 0v8a3 3 0 01-3 3H3a3 3 0 01-3-3v-8a1 1 0 011-1z"
        fill="#000"
      />
    </Svg>
  );
}
