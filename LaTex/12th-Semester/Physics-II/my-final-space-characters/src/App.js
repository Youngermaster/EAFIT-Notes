import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
const items = [
  {
    id: 'imageCapture',
    name: 'Captura de la imagen',
    thumb: 'https://via.placeholder.com/100/09f/fff.png'
  },
  {
    id: 'imageFormat',
    name: 'Formato de imagen (RAW)',
    thumb: 'https://via.placeholder.com/100/0f9/fff.png'
  },
  {
    id: 'modulation',
    name: 'Modulación',
    thumb: 'https://via.placeholder.com/100/f09/fff.png'
  },
  {
    id: 'transmission',
    name: 'Transmisión',
    thumb: 'https://via.placeholder.com/100/90f/fff.png'
  }
]


function App() {
  const [characters, updateCharacters] = useState(items);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pasos de la generación de la señal</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="characters-thumb">
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div>
                          <p>
                            {name}
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
