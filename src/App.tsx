import React from 'react'
import { useState } from 'react'
import CardWord from './components/CardWord'

interface ICard{
  id?: number;
  order?:number;
  text?: string;
}

function App() {

  const [cardList, setCardList] = useState([
    {id: 1, order: 3, text: 'Card 1'},
    {id: 2, order: 1, text: 'Card 2'},
    {id: 3, order: 4, text: 'Card 3'},
    {id: 4, order: 2, text: 'Card 4'},
  ]);

  const [currentCard, setCurrentCard] = useState<ICard>({})

  function dragStartHandler(e: React.MouseEvent, card: any){
    console.log('drag',card)
    setCurrentCard(card)
  }
  function dragLeaveHandler(e: any){
    console.log('drag leave')
    e.target.style.background = 'white'

  }
  function dragEndHandler(e: any){
    console.log('drag end')
    //e.target.style.background = 'white'
  }
  function dragOverHandler(e: any){
    e.preventDefault()
    e.target.style.background = 'lightgray'
  }
  function dropHandler(e: any, card: any){
    e.preventDefault()
    e.target.style.background = 'white'
    console.log('drop', card)
    setCardList(cardList.map((c: any) => {
      if(c.id === card.id){
        return { ...c, order: currentCard.order }
      }
      if(c.id === currentCard.id){
        return { ...c, order: card.order }
      }
      return c
    }))
  }

  const sortCards = (a: any, b: any) => {
    return a.order > b.order ? 1 : -1
  }

  return (
    <div className="App">
      {cardList.sort(sortCards).map((card,i) => 
        <CardWord key={i}
          onDragStart={(e: any) => dragStartHandler(e, card)}  
          onDragLeave={(e: any) => dragLeaveHandler(e)}
          onDragEnd={(e: any) => dragEndHandler(e)}
          onDragOver={(e: any) => dragOverHandler(e)}
          onDrop={(e: any) => dropHandler(e, card)}
          >
          {card.text}
        </CardWord>
      )}
    </div>
  );
}

export default App;
