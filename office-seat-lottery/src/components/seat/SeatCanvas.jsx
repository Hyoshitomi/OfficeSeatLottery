'use client'
import NameBox from './NameBox'
import AddBoxButton from './AddBoxButton'

export default function SeatCanvas({
  src,
  imgSize,
  boxes,
  onImgLoad,
  onDragStop,
  onUpdate,
  onAddBox,
}) {
  return (
    <div
      className="relative"
      style={{ width: imgSize.width, height: imgSize.height }}
    >
      <img
        src={src}
        alt="プレビュー画像"
        onLoad={onImgLoad}
        className="absolute top-0 left-0"
      />
      {boxes.map(b => (
        <NameBox
          key={b.id}
          id={b.id}
          name={b.name}
          isFixed={b.isFixed}
          position={{ x: b.x, y: b.y }}
          onDragStop={onDragStop}
          onUpdate={onUpdate}
        />
      ))}
      <AddBoxButton onClick={onAddBox} />
    </div>
  )
}
