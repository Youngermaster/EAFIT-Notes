import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from 'react-modal';

import DraggableItem from './DraggableItem';
import Dropzone from './Dropzone';

import './App.css';

Modal.setAppElement('#root');

const ITEMS = [
  { id: 1, text: 'Captura de la imagen' },
  { id: 2, text: 'Formato de imagen (RAW)' },
  { id: 3, text: 'Modulación' },
  { id: 4, text: 'Transmisión' },
];

const correctOrder = [1, 2, 3, 4];

function App() {
  const [droppedItems, setDroppedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDrop = (id) => {
    setDroppedItems((prev) => [...prev, id]);

    if (droppedItems.length === 3) {
      if (JSON.stringify([...droppedItems, id]) === JSON.stringify(correctOrder)) {
        setIsModalOpen(true);
      }
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            {ITEMS.map(item => (
              <DraggableItem key={item.id} id={item.id} text={item.text} handleDrop={handleDrop} />
            ))}
          </div>

          <Dropzone accept={ITEMS.map(item => item.type)} onDrop={(item) => handleDrop(item.id)} />

          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Success Modal"
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
              }
            }}
          >
            <h2>Success!</h2>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </Modal>
        </header>
      </div>
    </DndProvider>
  );
}

export default App;
