import React, { useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import styled from 'styled-components'
import "./App.css"

const currentString = "I don't know what the facking GraphQL"

const listItems = (str:string) => str.split(' ').map((item, index) => {
  return {id: String(index + 1), name: item, col: 1}
}).sort(() => Math.random() - 0.5)

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  trnsition: '.3s',
  background: isDragging ? 'lightgreen' : 'lightgrey',
  ...draggableStyle,
});

// const getItemCard = styled.div<{isDragging: boolean}>`
// 	padding: ${grid} * 2;
// 	margin: 0 ${grid}px 0 0;
// 	trnsition: .3s;
// 	background: ${props => (props.isDragging ? 'lightgreen' : 'lightgrey')};
// `;

const WordList = styled.div`
	display: flex;
	justify-content: center;
	padding: grid;
	overflow: auto;
	height:50px;
	background: lightblue;
`;

const PhraseBox = styled.div`
	display: flex;
	justify-content: center;
	padding: grid;
	overflow: auto;
	background: lightgray;
	height:50px;
	margin-top:50px;
`;
interface ICard {
	id: string;
	name:string;
	col: number
}
function App() {

	//const [initialData, setInitialData] = useState(listItems(currentString))

	const [ cards, setCards ] = useState<ICard[]>(listItems(currentString))
	const [isVictory, setVictory] = useState(false)

	const onDragEnd = (result: DropResult) => {
		const { source, destination, draggableId } = result
		if (!destination) return

		if(
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		){return}

		const start = source.droppableId;
		const finish = destination.droppableId;
		
		const items = Array.from(cards)
		const [ newOrder ] = items.splice(source.index, 1)

		if(start === finish){
			items.splice(destination.index, 0, newOrder)
			setCards(items)
			console.log(result)
		}else{
			const newCol = +finish.slice(-1);
			newOrder.col = newCol
			items.splice(destination.index, 0, newOrder)
		}

		getResult();
	}

	function getResult(){
		console.log(cards)
		for(let i = 0; i < cards.length; i++){
			let cId = +cards[i].id;
			if(i + 1 !== cId){
				setVictory(true)
			}
		}
		console.log(isVictory)
	}

	return (
		<div className="App">
			<h1>Collect the phrase</h1>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="col1" direction="horizontal">
					{(provided, snapshot) => (
						<WordList {...provided.droppableProps} ref={provided.innerRef}>
							{cards.map(({ id, name, col }, index) => {
								if(col === 1){
									return (
										<Draggable key={id} draggableId={id} index={index}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
												>
													{name}
												</div>
											)}
										</Draggable>
									)
								}
							})}
							{provided.placeholder}
						</WordList>
					)}
				</Droppable>
				
				<Droppable droppableId="col2" direction="horizontal">
					{(provided, snapshot) => (
						<PhraseBox {...provided.droppableProps} ref={provided.innerRef}>
							{cards.map(({ id, name, col }, index) => {
								if(col === 2){
									return (
										<Draggable key={id} draggableId={id} index={index}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
												>
													{name}
												</div>
											)}
										</Draggable>
									)
								}
							})}
							{provided.placeholder}
						</PhraseBox>
					)}
				</Droppable>

			</DragDropContext>
			<b>Drag a word to this field</b>
		</div>
	)
}

export default App
