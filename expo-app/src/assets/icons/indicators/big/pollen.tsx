import * as React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';

interface Props {}
export function Pollen(props: Props) {
  return (
    <Svg width={45} height={58} viewBox="0 0 45 58" fill="none" {...props}>
      <Path
        d="M26.082 31.09c0 4.454 3.882 8.122 8.744 8.122 4.863 0 8.744-3.669 8.744-8.122 0-4.453-3.881-8.121-8.744-8.121-4.862 0-8.744 3.668-8.744 8.121z"
        fill="#D9D9EF"
        stroke="#fff"
      />
      <Path
        d="M24.402 51.207c0 3.443 3.004 6.293 6.784 6.293s6.783-2.85 6.783-6.293-3.004-6.293-6.783-6.293c-3.78 0-6.784 2.85-6.784 6.293z"
        fill="#4FCBAD"
        stroke="#fff"
      />
      <Path
        d="M1.426 23.775c0 4.453 3.881 8.122 8.744 8.122 4.863 0 8.744-3.669 8.744-8.122 0-4.453-3.881-8.122-8.744-8.122-4.863 0-8.744 3.669-8.744 8.122z"
        fill="#D9D9EF"
        stroke="#fff"
      />
      <Ellipse
        cx={10.6446}
        cy={9.92791}
        rx={10.6446}
        ry={9.92791}
        transform="matrix(-1 0 0 1 40.71 0)"
        fill="#D9D9EF"
      />
      <Path
        d="M9.835 40.757c0 3.154 2.753 5.77 6.223 5.77 3.47 0 6.223-2.616 6.223-5.77 0-3.155-2.752-5.77-6.223-5.77-3.47 0-6.223 2.615-6.223 5.77z"
        fill="#4FCBAD"
        stroke="#fff"
      />
    </Svg>
  );
}
