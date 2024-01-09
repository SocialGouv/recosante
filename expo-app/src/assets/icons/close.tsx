import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

export function Close() {
  return (
    <Svg width={31} height={31} viewBox="0 0 31 31" fill="none">
      <Rect
        width={31}
        height={31}
        rx={15.5}
        fill="#848BC5"
        fillOpacity={0.41}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.393 9.726a.792.792 0 10-1.12-1.12L15.5 14.38 9.726 8.607a.792.792 0 00-1.12 1.12L14.38 15.5l-5.773 5.773a.792.792 0 001.12 1.12L15.5 16.62l5.773 5.773a.792.792 0 101.12-1.12L16.62 15.5l5.773-5.774z"
        fill="#fff"
      />
    </Svg>
  );
}
