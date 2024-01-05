import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Info() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2a9 9 0 100 18 9 9 0 000-18zM0 11C0 4.925 4.925 0 11 0s11 4.925 11 11-4.925 11-11 11S0 17.075 0 11zm11-1a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0-4a1 1 0 100 2h.01a1 1 0 100-2H11z"
        fill="#555"
      />
    </Svg>
  );
}
