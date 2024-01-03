import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';

interface Props {
  color: string;
  size: number;
  focused: boolean;
}

export function SettingsIcon(props: Props) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 18 20" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 5C6 3.34315 7.34315 2 9 2C10.6569 2 12 3.34315 12 5C12 6.65685 10.6569 8 9 8C7.34315 8 6 6.65685 6 5ZM9 0C6.23858 0 4 2.23858 4 5C4 7.76142 6.23858 10 9 10C11.7614 10 14 7.76142 14 5C14 2.23858 11.7614 0 9 0ZM5 12C3.67392 12 2.40215 12.5268 1.46447 13.4645C0.526784 14.4021 0 15.6739 0 17V19C0 19.5523 0.447715 20 1 20H17C17.5523 20 18 19.5523 18 19V17C18 15.6739 17.4732 14.4021 16.5355 13.4645C15.5979 12.5268 14.3261 12 13 12H5ZM2.87868 14.8787C3.44129 14.3161 4.20435 14 5 14H13C13.7956 14 14.5587 14.3161 15.1213 14.8787C15.6839 15.4413 16 16.2044 16 17V18H2V17C2 16.2043 2.31607 15.4413 2.87868 14.8787Z"
        fill={props.color}
      />
      <Path
        d="M16.0008 17.9999C16 13.5 16.5 13.9999 9 13.9999C2.98668 13.9999 2 13.5 2 17.9999H16.0008Z"
        fill={props.focused ? '#7883D3' : 'none'}
      />
      <Circle cx="9" cy="5" r="3" fill={props.focused ? '#7883D3' : 'none'} />
    </Svg>
  );
}
