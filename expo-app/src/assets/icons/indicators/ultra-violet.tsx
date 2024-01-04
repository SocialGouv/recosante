import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export function UltraVioletIcon() {
  return (
    <Svg width={35} height={33} viewBox="0 0 35 33" fill="none">
      <Circle cx={17.5011} cy={15.5001} r={8.55186} fill="#fff" />
      <Path
        d="M17.501 24.052a8.552 8.552 0 01-7.322-12.97l7.322 4.418v8.552z"
        fill="#fff"
      />
      <Path
        d="M11.625 25.656l-1.87 3.268M25.25 2.076l-1.87 3.268M7.348 21.379l-3.269 1.87M30.926 7.75l-3.268 1.87M33 15.5h-3.741M5.742 15.5H2.001M30.926 23.25l-3.268-1.87M7.348 9.621l-3.269-1.87M25.25 28.924l-1.87-3.268M11.625 5.345l-1.87-3.269M17.5 31v-3.741"
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
