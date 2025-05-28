import NameBox from './NameBox'
import AddBoxButton from './AddBoxButton'

export default function SeatCanvas({
  src,
  imgSize,
  boxes,
  onImgLoad,
  onDragStop,
  onUpdate,
  onDelete,
  onExit,
  onAddBox,
  move = false,
}) {
  return (
    <div className="relative">
      <img
        src={src}
        onLoad={onImgLoad}
        style={{ width: imgSize.width, height: imgSize.height }}
        alt="座席表"
      />
      {boxes.map(box => (
        <div
          key={box.id}
          style={{
            position: 'absolute',
            left: box.x,
            top: box.y,
            width: 70,
            height: 40,
          }}
        >
          <NameBox
            id={box.id}
            name={box.name}
            status={box.status}
            position={{ x: box.x, y: box.y }}
            onDragStop={onDragStop}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onExit={onExit}
            move={move}
          />
        </div>
      ))}
      {move && <AddBoxButton onClick={onAddBox} />}
    </div>
  )
}
