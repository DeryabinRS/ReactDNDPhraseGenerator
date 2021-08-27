import React, {FC} from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background: transparent;
  border-radius: 2px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  cursor:grab;
`
interface ICard{
  onDragStart: (event: any) => void;
  onDragLeave: (event: any) => void;
  onDragEnd: (event: any) => void;
  onDragOver: (event: any) => void;
  onDrop: (event: any) => any;
}

const CardWord: FC<ICard> = 
  ({
    children, 
    onDragStart, 
    onDragLeave, 
    onDragEnd, 
    onDragOver, 
    onDrop
  }) => {
  return (
    <Card
      onDragStart={onDragStart}  
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}

      draggable={true}
    >
      {children}
    </Card>
  )
}

export default CardWord