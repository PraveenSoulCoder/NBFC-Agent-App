import * as React from "react";
import Svg, { SvgProps, Path ,Defs,Polygon} from "react-native-svg";

type Props = {
    color?: string;
};

const TransferSvg: React.FC<Props> = ({ color = "#4C4C60" }) => (
    <Svg width={22} height={22} fill="none">
      <Path d="m15 12 5-4-5-4v2.999H2v2h13zm7 3H9v-3l-5 4 5 4v-3h13z" fill={color}/>
    </Svg>
);

export default TransferSvg;


