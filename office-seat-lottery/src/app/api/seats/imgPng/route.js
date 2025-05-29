import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function POST(req) {
  try {
    const { bg, boxes } = await req.json()

    const width = 850
    const height = 760

    // statusごとのスタイル
    const statusStyle = {
      movable: {
        border: '2px solid #1AA7FF',
        background: '#FFFFFF',
        color: '#000',
        fontWeight: 'bold',
        boxShadow: '0 2px 8px #1AA7FF44',
      },
      fixed: {
        border: '2px solid #000',
        background: '#F5F5F5',
        color: '#222',
        fontWeight: 'bold',
        boxShadow: '0 2px 8px #8884',
      },
      unused: {
        border: '2px dashed #ccc',
        background: '#eee',
        color: '#bbb',
        fontStyle: 'italic',
      },
      reserved: {
        border: '2px solid #22c55e',
        background: '#bbf7d0',
        color: '#15803d',
        fontWeight: 'bold',
        boxShadow: '0 2px 8px #22c55e44',
      }
    }

    return new ImageResponse(
      (
        <div style={{
          width,
          height,
          position: 'relative',
          fontFamily: 'sans-serif',
          background: '#fff',
          display: 'flex',
        }}>
          {/* 背景画像は絶対URLのときだけ */}
          {bg && /^https?:\/\//.test(bg) && (
            <img
              src={bg}
              width={width}
              height={height}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: width,
                height: height,
                objectFit: 'cover',
                zIndex: 0,
                display: 'block',
              }}
            />
          )}
          {/* 座席ボックス */}
          {Array.isArray(boxes) && boxes.map((box) => (
            <div
              key={box.id}
              style={{
                position: 'absolute',
                left: box.x,
                top: box.y,
                width: 70,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 17,
                borderRadius: 8,
                zIndex: 1,
                ...((statusStyle[box.status]) || statusStyle['movable']),
              }}
            >
              {box.name}
            </div>
          ))}
        </div>
      ),
      { width, height }
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message, stack: e.stack }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
