import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Player } from "../Game/typings";
import { Card, CardList, TCard } from "..";

interface Props {
   players: Player[];
   player: Player;
   cards: TCard[];
   totalBank: number;
}

import classes from './Table.module.css'

export const Table: React.FC<Props> = React.memo(({player, players, cards, totalBank}) => {
   return <div className={classes.content}>
      <div className={classes.table}>
         <CardList cards={cards} />
         Банк : {totalBank}
      </div>
      <CardList cards={player?.cards}/>
   </div>;
});
