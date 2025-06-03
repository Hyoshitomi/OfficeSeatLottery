import NameBox from '@/components/seat/name-box'
import AddBoxButton from '@/components/seat/add-box-button'

export default function SeatCanvas({
  src,
  imgSize = { width: 800, height: 600 }, // デフォルト値を設定
  boxes = [], // デフォルト値を設定
  onImgLoad,
  onDragStop,
  onUpdate,
  onDelete,
  onExit,
  onAddBox,
  onSeatClick,
  selectedSeatIds = [],
  appoint = false,
  move = false,
}) {
  // 安全な値の取得
  const safeImgSize = {
    width: imgSize?.width || 800,
    height: imgSize?.height || 600
  }

  const safeSelectedSeatIds = selectedSeatIds || []

  return (
    <div className="relative inline-block">
      <img
        src={src}
        onLoad={(e) => onImgLoad && onImgLoad({ 
          width: safeImgSize.width, 
          height: safeImgSize.height 
        })}
        style={{ width: safeImgSize.width, height: safeImgSize.height }}
        alt="オフィスレイアウト"
      />
      {boxes && boxes.map(box => (
        <div
          key={box.id}
          style={{
            position: 'absolute',
            left: box.x || 0,
            top: box.y || 0,
            width: 70,
            height: 40,
          }}
        >
          <NameBox
            id={box.id}
            name={box.name}
            status={box.status}
            position={{ x: box.x || 0, y: box.y || 0 }}
            onDragStop={onDragStop}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onExit={onExit}
            onSeatClick={onSeatClick}
            isSelected={safeSelectedSeatIds.includes(box.id)}
            appoint={appoint}
            move={move}
          />
        </div>
      ))}
      {move && <AddBoxButton onClick={onAddBox} />}
    </div>
  )
}
