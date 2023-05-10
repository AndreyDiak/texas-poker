import React from "react"
import { TCard } from "../typings"
import { Card } from "../Card/Card"

import classes from './CardList.module.css'

export const CardList : React.FC<{cards: TCard[]}> = React.memo(({cards}) => {
   return (
      <div className={classes.list}>
         {cards?.map(card => (
            <Card {...card} key={Math.random()}/>
         ))}
      </div>
   )
})