import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Message() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M18 0H2C.9 0 .01.9.01 2L0 20l4-4h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM7 9H5V7h2v2zm4 0H9V7h2v2zm4 0h-2V7h2v2z"
        fill="#1E1E1E"
      />
    </Svg>
  );
}
