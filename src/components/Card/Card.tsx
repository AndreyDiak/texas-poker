import React, { ReactNode } from "react";
import { TCard, SUIT } from "../typings";

import {
   BsFillSuitClubFill,
   BsFillSuitDiamondFill,
   BsFillSuitHeartFill,
   BsFillSuitSpadeFill,
} from "react-icons/bs";

import { classNames } from "../../utils";
import classes from "./Card.module.css";

const suitToIconMap: Record<SUIT, ReactNode> = {
   [SUIT.DIMOND]: BsFillSuitDiamondFill(),
   [SUIT.HEART]: BsFillSuitHeartFill(),
   [SUIT.CLUB]: BsFillSuitClubFill(),
   [SUIT.SPADE]: BsFillSuitSpadeFill(),
};

export const Card: React.FC<TCard> = React.memo(({ suit, rating }) => {
   const color = suit === SUIT.DIMOND || suit === SUIT.HEART ? "red" : "black";

   const colorStyle = {
      color,
   };

   return (
      <div className={classes.card}>
         <div>
            <div className={classNames(classes.value, classes.valueTop)} style={colorStyle}>
               {rating?.toUpperCase()}
            </div>
            <div className={classNames(classes.value, classes.valueBottom)} style={colorStyle}>
               {rating?.toUpperCase()}
            </div>
            <div className={classes.suit} style={colorStyle}>
               {suitToIconMap[suit]}
            </div>
         </div>
      </div>
   );
});
