

export const enum SUIT {
   HEART = "hearts", // черви
   SPADE = "spades", // пики
   DIMOND = "diamond", // бубны
   CLUB = "club", // трефы
}

export type Rating =
   | "2"
   | "3"
   | "4"
   | "5"
   | "6"
   | "7"
   | "8"
   | "9"
   | "10"
   | "j" // валет
   | "q" // дама
   | "k" // король
   | "a"; // туз

export type PreviewCard = TCard & {
   isVisible: boolean;
}

export interface TCard  {
   suit: SUIT;
   rating: Rating;
}