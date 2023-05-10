import { Rating, SUIT, TCard } from "../components";

export function createDeck(shuffleCount: number): TCard[] {
   const suits = [SUIT.CLUB, SUIT.DIMOND, SUIT.HEART, SUIT.SPADE];
   const ratings: Rating[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a"];

   const result: TCard[] = [];

   for (const suit of suits) {
      for (const rating of ratings) {
         result.push({
            suit,
            rating,
         });
      }
   }

   for (let i = 0; i < shuffleCount; i++) {
      result.sort(() => Math.random() - 0.5);
   }

   return result;
}
