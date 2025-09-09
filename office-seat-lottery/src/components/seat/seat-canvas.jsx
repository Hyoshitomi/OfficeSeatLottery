// seat-canvas.jsx
/* eslint-disable @next/next/no-img-element */
import AddBoxButton from '@/components/seat/add-box-button';
import NameBox from '@/components/seat/name-box';

/**
 * デフォルト定数
 */
const DEFAULT_IMG_SIZE = { width: 832, height: 757 };
const DEFAULT_BOXES = [];
const DEFAULT_SELECTED_SEAT_IDS = [];

/**
 * タイトル: getSafeImgSize / 画像サイズの安全な取得
 * 要約: 未定義を避けつつ、幅と高さのデフォルト値を付与します。
 * @param {{width?:number,height?:number}|undefined} imgSize - 元の画像サイズ。
 * @returns {{width:number,height:number}} 安全なサイズ。
 */
const getSafeImgSize = (imgSize) => ({
  width: imgSize?.width || DEFAULT_IMG_SIZE.width,
  height: imgSize?.height || DEFAULT_IMG_SIZE.height,
});

/**
 * タイトル: handleImgLoadProxy / 画像ロードイベントの変換
 * 要約: onLoadイベントからnaturalWidth/Heightを抽出して親のonImgLoadへ通知します。
 * @param {(size:{width:number,height:number})=>void|undefined} onImgLoad - 親コールバック。
 * @returns {(e: React.SyntheticEvent<HTMLImageElement, Event>)=>void} ハンドラ。
 */
const handleImgLoad = (onImgLoad, safeImgSize) => {
  if (!onImgLoad) return
  onImgLoad({ 
    width: safeImgSize.width, 
    height: safeImgSize.height 
  })
}

/**
 * タイトル: SeatCanvas / 座席表キャンバス
 * 要約: 座席表画像の上に座席ボックスを描画し、各種操作を提供します。
 * 補足: デザインは親側スタイル前提のため、余計な装飾は行いません。
 * @param {{
 *   src: string,
 *   imgSize?: {width:number,height:number},
 *   boxes?: Array<{id:string|number,name:string,status:string,x:number,y:number}>,
 *   onImgLoad?: (size:{width:number,height:number}) => void,
 *   onDragStop?: (id:string|number,x:number,y:number)=>void,
 *   onUpdate?: (id:string|number, updates:any)=>void,
 *   onDelete?: (id:string|number)=>void,
 *   onExit?: (id:string|number)=>void,
 *   onAddBox?: () => void,
 *   onSeatClick?: (id:string|number)=>void,
 *   selectedSeatIds?: Array<string|number>,
 *   appoint?: boolean,
 *   move?: boolean
 * }} props - 各種プロパティ。
 * @returns {import('react').ReactElement}
 */
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
