import React, {ReactFragment as RF} from 'react';
import { useState } from 'react';
import styled from 'styled-components'

const CardStyle = styled.div`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  cursor:grab;
`

function App() {
  const [cardList, setCardList] = useState([
    {id: 1, order: 3, text: 'Card 1'},
    {id: 2, order: 1, text: 'Card 2'},
    {id: 3, order: 4, text: 'Card 3'},
    {id: 4, order: 2, text: 'Card 4'},
  ]);

  function dragStartHandler(e: React.MouseEvent, card: any){
    console.log('drag',card)
  }
  function dragLeaveHandler(e: React.MouseEvent){

  }
  function dragOverHandler(e: React.MouseEvent){
    e.preventDefault()

  }
  function dragEndHandler(e: React.MouseEvent){
    
  }
  function dropHandler(e: React.MouseEvent, card: any){
    e.preventDefault()
    console.log('drop', card)
  }

  return (
    <div className="App">
      {cardList.map((card,i) => 
        <div key={i}
          onDragStart={(e) => dragStartHandler(e, card)}  
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDrop={(e) => dropHandler(e, card)}

          className={'card'} 
          draggable={true}>
          {card.text}
        </div>
      )}
    </div>
  );
}

export default App;
