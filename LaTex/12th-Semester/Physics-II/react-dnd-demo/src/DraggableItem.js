import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  ITEM: 'item'
}

const cardStyle = {
  padding: '8px 16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer',
  marginBottom: '10px'
};

const DraggableItem = ({ id, text, handleDrop }) => {
  const [{ opacity }, dragRef] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item: { id, text },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        handleDrop(item.id);
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  }), []);

  return (
    <div ref={dragRef} style={{ ...cardStyle, opacity }}>
      {text}
    </div>
  )
}

export default DraggableItem;
