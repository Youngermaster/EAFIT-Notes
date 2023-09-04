import React from 'react';
import { useDrop } from 'react-dnd';

const ItemTypes = {
  ITEM: 'item'
}

const dropZoneStyle = {
  padding: '16px',
  border: '1px dashed gray',
  minHeight: '200px'
};

const Dropzone = ({ onDrop }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), []);

  return (
    <div ref={dropRef} style={dropZoneStyle}>
      {isOver ? 'Release to drop' : 'Drag an item here'}
    </div>
  )
}

export default Dropzone;
