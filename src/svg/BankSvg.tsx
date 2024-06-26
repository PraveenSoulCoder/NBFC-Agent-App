import * as React from "react";
import Svg, { Path,Defs,G } from "react-native-svg";

const BankSVG: React.FC = () => (
    <Svg width={16} height={16} fill="none" viewBox="0 0 24 24">
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M2 20h20v2H2v-2zm2-8h2v7H4v-7zm5 0h2v7H9v-7zm4 0h2v7h-2v-7zm5 0h2v7h-2v-7zM2 7l10-5 10 5v4H2V7zm2 1.236V9h16v-.764l-8-4-8 4zM12 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" stroke="black"/>
    </Svg>
);

export default BankSVG;