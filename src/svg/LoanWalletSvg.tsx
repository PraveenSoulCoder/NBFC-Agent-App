import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

type Props = {
  color?: string;
}; 

const LoanWalletSvg: React.FC<Props> = ({ color = "#4C4C60" }) => (
    <Svg width={22} height={22} fill="none">
        <Path
            d="M18.748 5.4 15.944.543c-.145-.25-.38-.43-.66-.506a1.079 1.079 0 0 0-.825.108L5.358 5.4H3.28A2.295 2.295 0 0 0 .988 7.693V17.73a2.296 2.296 0 0 0 2.293 2.293h.623a4.72 4.72 0 0 0 7.68 0h7.135a2.296 2.296 0 0 0 2.293-2.293V7.693A2.295 2.295 0 0 0 18.748 5.4Zm-8.25 0 5.592-3.23.483.838L12.431 5.4h-1.934Zm6.419-1.797L17.954 5.4h-4.148l3.11-1.797ZM14.803.74a.396.396 0 0 1 .303-.039c.103.028.19.094.242.186l.398.689L9.122 5.4h-2.39l8.07-4.66Zm-7.06 20.573a4.04 4.04 0 0 1-4.034-4.036 4.04 4.04 0 0 1 4.035-4.035 4.04 4.04 0 0 1 4.035 4.035 4.04 4.04 0 0 1-4.035 4.035Zm10.976-1.977h-6.725a4.694 4.694 0 0 0 .472-2.059 4.728 4.728 0 0 0-4.722-4.722 4.728 4.728 0 0 0-4.723 4.722c0 .738.17 1.436.473 2.059h-.213c-.885 0-1.605-.72-1.605-1.605V7.692c0-.886.72-1.606 1.605-1.606H18.72c.885 0 1.605.72 1.605 1.606v2.497h-5.333a2.525 2.525 0 0 0-2.522 2.522 2.525 2.525 0 0 0 2.522 2.521h5.333v2.497c0 .886-.72 1.606-1.605 1.606Zm1.605-8.459v3.67h-5.333a1.836 1.836 0 0 1-1.835-1.835c0-1.012.823-1.835 1.835-1.835h5.333Zm-6.396 1.835a1.064 1.064 0 0 0 2.126 0c0-.587-.477-1.064-1.063-1.064s-1.063.477-1.063 1.064Zm1.439 0a.376.376 0 1 1-.753-.001.376.376 0 0 1 .753 0ZM9.13 17.765a1.174 1.174 0 0 0-.828 2c.22.221.515.343.828.343.313 0 .607-.122.829-.343.22-.222.343-.516.343-.829 0-.313-.122-.607-.344-.828a1.164 1.164 0 0 0-.828-.343Zm.342 1.514a.481.481 0 0 1-.827-.342.485.485 0 1 1 .827.342ZM6.358 16.79a1.173 1.173 0 0 0 .828-2 1.173 1.173 0 0 0-2 .83c0 .645.526 1.17 1.172 1.17Zm-.485-1.171a.485.485 0 1 1 .485.484.485.485 0 0 1-.485-.485Zm3.727-.317-3.103 4.322a.343.343 0 1 1-.559-.401L9.041 14.9a.344.344 0 1 1 .559.4Z"
            fill={color}
        />
    </Svg>
);

export default LoanWalletSvg;