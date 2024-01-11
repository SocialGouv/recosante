import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {}
export function Swimming(props: Props) {
  return (
    <Svg width={72} height={61} viewBox="0 0 72 61" fill="none" {...props}>
      <Path
        d="M2.29 11.75c9.345 0 16.353-9.375 16.353-9.375s7.008 9.375 16.352 9.375c9.346 0 18.69-9.375 18.69-9.375s9.346 9.375 16.354 9.375M2.29 35.188c9.345 0 16.353-9.376 16.353-9.376s7.008 9.375 16.352 9.375c9.346 0 18.69-9.374 18.69-9.374s9.346 9.375 16.354 9.375M2.29 58.625c9.345 0 16.353-9.375 16.353-9.375s7.008 9.375 16.352 9.375c9.346 0 18.69-9.375 18.69-9.375s9.346 9.375 16.354 9.375"
        stroke="#9DF5F0"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
