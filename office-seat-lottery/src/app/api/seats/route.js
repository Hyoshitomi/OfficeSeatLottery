import { NextResponse } from 'next/server'
import Database from 'better-sqlite3'

export async function GET() {
  try {
    // データベースファイルのパスを指定
    const db = new Database('prisma/dev.db') 

    const query = `
      SELECT 
        s.id AS seat_id,
        s.table_id,
        s.seat_number,
        s.is_fixed,
        s.image_x,
        s.image_y,
        t.name AS table_name
      FROM Seat s
      INNER JOIN Table t ON s.table_id = t.id
    `

    // SQLで全件取得
    const stmt = db.prepare(query)
    const seats = stmt.all()

    db.close()

    return NextResponse.json(seats, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
