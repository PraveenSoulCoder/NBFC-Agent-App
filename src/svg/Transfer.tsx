import * as React from "react";
import Svg, {
    SvgProps,
    G,
    Rect,
    Ellipse,
    Circle,
    Defs,
    LinearGradient,
    Stop,
    ClipPath,
} from "react-native-svg";

const TransferSvg: React.FC = (props: SvgProps) => (
    <svg width="512px" height="512px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <polygon fill="var(--ci-primary-color, currentColor)" points="356.687 228.687 379.313 251.313 494.627 136 379.313 20.687 356.687 43.313 433.372 120 16 120 16 152 433.372 152 356.687 228.687" />
  <polygon fill="var(--ci-primary-color, currentColor)" points="496 360 78.628 360 155.313 283.313 132.687 260.687 17.373 376 132.687 491.313 155.313 468.687 78.628 392 496 392 496 360" />
</svg>
);

export default TransferSvg;