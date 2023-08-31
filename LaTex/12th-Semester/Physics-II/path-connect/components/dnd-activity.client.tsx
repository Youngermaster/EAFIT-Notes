import { useDrag, useDrop } from 'react-dnd';

const ItemType = {
  ITEM: 'ITEM',
};

function DraggableItem({ item, moveItem, index }) {
  const [, ref] = useDrag({
    type: ItemType.ITEM,
    item: { type: ItemType.ITEM, index },
  });

  const [, drop] = useDrop({
    accept: ItemType.ITEM,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))}>
      {item.name}
    </div>
  );
}

export default function DnDActivity() {
  const [items, setItems] = React.useState(ITEMS);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <DraggableItem
          key={item.id}
          item={item}
          index={index}
          moveItem={moveItem}
        />
      ))}
    </div>
  );
}
