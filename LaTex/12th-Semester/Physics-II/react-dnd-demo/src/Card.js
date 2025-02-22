import React from 'react'
import { useDrag } from 'react-dnd'

const ItemTypes = {
  CARD: 'card'
}

export default function Card({ text }) {
  const [{ opacity }, dragRef] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { text },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  }), [])

  return (
    <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  )
}
