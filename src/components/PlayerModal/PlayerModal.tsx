import React, { useState } from "react";
import { Player } from "../Game/typings";

import classes from "./PlayerModal.module.css";

interface Props {
   totalBank: number;
   minBet: number;
   playerInfo: Player;
   onOk(bank: number): void;
   onCancel(): void;
}

export const PlayerModal: React.FC<Props> = React.memo(
   ({ totalBank, playerInfo, minBet, onOk, onCancel }) => {
      const [bank, setBank] = useState(minBet);

      const changeBank = (value: number) => {
         if (value < minBet || value > playerInfo.bank) {
            return;
         }
         setBank(value);
      };

      return (
         <div className={classes.modal}>
            <div>
               <div>Текущий банк: {totalBank}</div>
               <div>Мин ставка: {minBet}</div>
               <div>Баланс: {playerInfo?.bank}</div>
            </div>
            <input
               type="number"
               onChange={(e) => changeBank(Number.parseInt(e.target.value))}
               value={bank}
            />
            <div>
               <button onClick={onCancel}>Пас</button>
               <button onClick={() => onOk(bank)}>Играть</button>
            </div>
         </div>
      );
   }
);
