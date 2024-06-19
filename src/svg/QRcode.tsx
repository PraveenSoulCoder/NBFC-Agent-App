import * as React from "react";
import Svg, { SvgProps, Path ,Defs,G,Rect} from "react-native-svg";

type Props = {
    color?: string;
};

const QRSvg: React.FC<Props> = ({ color = "#4C4C60" }) => (
    <Svg width={22} height={22} fill="none">
     <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 3H3V9H5V5H9V3ZM3 21V15H5V19H9V21H3ZM15 3V5H19V9H21V3H15ZM19 15H21V21H15V19H19V15ZM7 7H11V11H7V7ZM7 13H11V17H7V13ZM17 7H13V11H17V7ZM13 13H17V17H13V13Z"
      fill={color}
    />
  </Svg>
);

export default QRSvg;

