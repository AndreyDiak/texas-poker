import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Player } from "./typings";
import { TCard } from "..";
import { createDeck, createName } from "../../utils";
import { calculateChances } from "../../utils/rounds/preFlop";
import { Table } from "../Table/Table";
import { PlayerModal } from "../PlayerModal/PlayerModal";

interface Props {
   count: number; // кол-во ботов (без учета игрока)
}

const SHUFFLE_COUNT = 1000;

export const Game: React.FC<Props> = React.memo(({ count }) => {
   // -1 - генерация колоды
   // 0 - префлоп
   // 1 - флоп
   // 2 - терн
   // 3 - ривер
   const [isGameStarted, setIsGameStarted] = useState(false);
   const [roundIndex, setRoundIndex] = useState(-1);
   // карты в колоде
   const [cards, setCards] = useState<TCard[]>([]);
   // общий банк игры
   const [bank, setBank] = useState<number>(0);
   // карты на столе
   const [activeCards, setActiveCards] = useState<TCard[]>([]);

   const [players, setPlayers] = useState<Player[]>([]); // боты
   const [player, setPlayer] = useState<Player>({} as Player); // игрок
   const [isPlayerTurn, setIsPlayerTurn] = useState(false);

   console.log({ players });

   // генерация колоды
   const generateCards = useCallback(() => {
      setCards(createDeck(SHUFFLE_COUNT));
      setRoundIndex(-1);
      setIsGameStarted(true);
   }, []);

   const giveCards = useCallback((cards: TCard[]) => {
      const first = cards.shift() ?? ({} as TCard);
      const second = cards.shift() ?? ({} as TCard);

      return {
         first,
         second,
      };
   }, []);

   const generatePlayer = useCallback(
      (name: string): Player => ({
         isActive: true,
         cards: [],
         bank: 100,
         name,
      }),
      []
   );

   const prepareGame = useCallback(() => {
      const cardsCopy = [...cards];
      const newPlayers: Player[] = [];
      // создаем игрока...
      const player = generatePlayer("Andrey");
      const { first, second } = giveCards(cardsCopy);
      player.cards = [first, second];

      // создаем ботов
      for (let i = 0; i < count; i++) {
         const bot: Player = {
            isActive: true,
            cards: [],
            bank: 100,
            name: createName(),
         };
         const { first, second } = giveCards(cardsCopy);
         bot.cards = [first, second];
         newPlayers.push(bot);
      }

      setCards(cardsCopy);
      setPlayer(player);
      setPlayers(newPlayers);
      setRoundIndex(0);
   }, [cards, count, generatePlayer, giveCards]);

   const preflopRound = useCallback(() => {
      const playersCopy = [...players];
      const newPlayers: Player[] = [];
      let totalBank = 0;
      for (let i = 0; i < count; i++) {
         const isActive = calculateChances(playersCopy[i].cards);
         newPlayers.push({
            ...playersCopy[i],
            isActive,
            bank: isActive ? playersCopy[i].bank - 40 : playersCopy[i].bank,
         });
         if (isActive) totalBank += 40;
      }
      setPlayers(newPlayers);
      setIsPlayerTurn(true);
      setBank((prev) => prev + totalBank);
   }, [count, players]);

   const preflopCards = useCallback(() => {
      const copy = [...cards];
      const card1 = copy.shift() ?? ({} as TCard);
      const card2 = copy.shift() ?? ({} as TCard);
      const card3 = copy.shift() ?? ({} as TCard);
      const cardsCopy = [card1, card2, card3];

      setActiveCards(cardsCopy);
      setCards(copy);
   }, [cards]);

   const onPlayerOk = useCallback(
      (bank: number) => {
         setPlayer((prev) => ({
            ...prev,
            bank: prev.bank - bank,
         }));
         setBank((prev) => prev + bank);
         setIsPlayerTurn(false);
         preflopCards();
      },
      [preflopCards]
   );

   useEffect(() => {
      const play = () => {
         switch (roundIndex) {
            case -1: {
               prepareGame();
               break;
            }
            case 0: {
               // все игроки смотрят карты
               preflopRound();
               // ждем ответа игрока...
               break;
            }
            case 1: {
               break;
            }
            case 2: {
               break;
            }
            case 3: {
               break;
            }
            default: {
               break;
            }
         }
      };
      play();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [roundIndex]);

   if (!isGameStarted) {
      return <button onClick={() => generateCards()}>начать игру</button>;
   }

   return (
      <div>
         {isPlayerTurn && (
            <PlayerModal
               totalBank={bank}
               playerInfo={player}
               minBet={40}
               onOk={onPlayerOk}
               onCancel={() => {
                  setIsGameStarted(false);
                  setIsPlayerTurn(false);
               }}
            />
         )}

         <Table player={player} players={players} cards={activeCards} totalBank={bank} />
      </div>
   );
});
