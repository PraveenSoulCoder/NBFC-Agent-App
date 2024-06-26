import * as React from "react";
import Svg, { Path,Defs,G } from "react-native-svg";

const PanSVG: React.FC = () => (
    <Svg width={16} height={16} fill="none"  viewBox="0 0 24 24">
<Path d="M17,4.25H7A4.756,4.756,0,0,0,2.25,9v6A4.756,4.756,0,0,0,7,19.75H17A4.756,4.756,0,0,0,21.75,15V9A4.756,4.756,0,0,0,17,4.25ZM7,5.75H17A3.254,3.254,0,0,1,20.25,9v.25H3.75V9A3.254,3.254,0,0,1,7,5.75Zm10,12.5H7A3.254,3.254,0,0,1,3.75,15V10.75h16.5V15A3.254,3.254,0,0,1,17,18.25ZM10.75,15a.75.75,0,0,1-.75.75H7a.75.75,0,0,1,0-1.5h3A.75.75,0,0,1,10.75,15Z" stroke="black"></Path>
        </Svg>
);

export default PanSVG;