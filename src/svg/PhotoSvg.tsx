import * as React from "react";
import Svg, { Path,Defs,G ,Line,Circle,Rect,Polygon} from "react-native-svg";

const PhotoSVG: React.FC = () => (
    <Svg width={16} height={16} fill="none" viewBox="0 0 32 32">
<G>
      <Rect
        fill="none"
        height={22}
        stroke="#000000"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}
        width={30}
        x={1}
        y={5}
      />
      <Polygon
        fill="none"
        points="31,27 21,17    11,27  "
        stroke="#000000"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}
      />
      <Polygon
        fill="none"
        points="18,20 9,11 1,19    1,27 11,27  "
        stroke="#000000"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}
      />
      <Circle
        cx={19}
        cy={11}
        fill="none"
        r={2}
        stroke="#000000"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}
      />
    </G>    
    </Svg>
);

export default PhotoSVG;