import { Rating, TCard } from "../../components";

const VALUE_TO_RESIGN = 7;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const cardValueMap: Record<Rating, number> = {
   j: 11,
   q: 12,
   k: 13,
   a: 14,
};

export function calculateChances(cards: TCard[]) {
   let total = 0;
   for (const card of cards) {
      if (cardValueMap[card.rating]) {
         total += cardValueMap[card.rating];
      } else {
         total += Number.parseInt(card.rating);
      }
   }
   return total > VALUE_TO_RESIGN;
}
