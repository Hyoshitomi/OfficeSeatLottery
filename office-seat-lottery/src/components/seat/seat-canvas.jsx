/* eslint-disable @next/next/no-img-element */

import AddBoxButton from '@/components/seat/add-box-button'
import NameBox from '@/components/seat/name-box'

// デフォルト値を定数として定義
const DEFAULT_IMG_SIZE = { width: 800, height: 600 }
const DEFAULT_BOXES = []
const DEFAULT_SELECTED_SEAT_IDS = []

// 安全な値を取得するヘルパー関数
const getSafeImgSize = (imgSize) => ({
  width: imgSize?.width || DEFAULT_IMG_SIZE.width,
  height: imgSize?.height || DEFAULT_IMG_SIZE.height
})

const handleImgLoad = (onImgLoad, safeImgSize) => {
  if (!onImgLoad) return
  onImgLoad({ 
    width: safeImgSize.width, 
    height: safeImgSize.height 
  })
}

export default function SeatCanvas({
  src,
  imgSize = DEFAULT_IMG_SIZE,
  boxes = DEFAULT_BOXES,
  onImgLoad,
  onDragStop,
  onUpdate,
  onDelete,
  onExit,
  onAddBox,
  onSeatClick,
  selectedSeatIds = DEFAULT_SELECTED_SEAT_IDS,
  appoint = false,
  move = false,
}) {
  const safeImgSize = getSafeImgSize(imgSize)
  const safeSelectedSeatIds = selectedSeatIds || DEFAULT_SELECTED_SEAT_IDS

  return (
    <div className="relative inline-block">
      <img
        src={src}
        onLoad={() => handleImgLoad(onImgLoad, safeImgSize)}
        style={{ width: safeImgSize.width, height: safeImgSize.height }}
        alt="オフィスレイアウト"
      />
      {(boxes || []).map(box => (
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
