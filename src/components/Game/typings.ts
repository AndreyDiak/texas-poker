import { TCard } from "..";

export interface Player {
   isActive: boolean;
   cards: TCard[];
   bank: number;
   name: string;
}