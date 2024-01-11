import * as React from 'react';
import Svg, { Ellipse, Path } from 'react-native-svg';

// TODO: Il n'y qu'un quart de soleil. Il faut ajouter les autres

interface Props {
  value: number | undefined;
  color: string | undefined;
}
export function Uv(props: Props) {
  const color = props.color ?? '#D9D9EF';

  return (
    <Svg width={65} height={65} viewBox="0 0 65 65" fill="none" {...props}>
      <Ellipse
        cx={32.4994}
        cy={32.5004}
        rx={16.8275}
        ry={16.8276}
        fill={color}
        fillOpacity={0.5}
      />
      <Path
        d="M32.5 49.328a16.828 16.828 0 01-14.408-25.522L32.499 32.5v16.828z"
        fill={color}
      />
      <Path
        d="M20.93 52.482l-3.681 6.431"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M47.75 6.086l-3.681 6.43"
        stroke={color}
        strokeOpacity={0.5}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.516 44.068L6.085 47.75"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M58.914 17.25l-6.43 3.681M63 32.5h-7.362"
        stroke={color}
        strokeOpacity={0.5}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.36 32.5H1.996"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M58.914 47.75l-6.43-3.681"
        stroke={color}
        strokeOpacity={0.5}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.516 20.93l-6.431-3.68"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M47.75 58.913l-3.681-6.43M20.93 12.517l-3.681-6.431M32.5 9.362V2"
        stroke={color}
        strokeOpacity={0.5}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M32.5 63v-7.362"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
