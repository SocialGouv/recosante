import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused: boolean;
}

export function HomeIcon(props: Props) {
  return (
    <Svg height={props.size} width={props.size} viewBox="0 0 21 22" fill="none">
      <Path
        d="M16.5271 21H14.603H6.39696H4.47291C2.55488 21 1 19.4607 1 17.5618V8.84736C1.00739 8.09967 1.36226 7.39702 1.96203 6.94256L8.51342 1.6853C9.6662 0.771566 11.3049 0.771566 12.4577 1.6853L19.038 6.93303C19.6355 7.38935 19.9898 8.09083 20 8.83784V17.5618C20 19.4607 18.4451 21 16.5271 21Z"
        fill={props.focused ? 'white' : 'none'}
        fillOpacity="0.34"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
