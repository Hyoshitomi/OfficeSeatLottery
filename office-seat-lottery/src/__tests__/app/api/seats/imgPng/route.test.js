/**
 * @jest-environment node
 */

import { POST } from '@/app/api/seats/imgPng/route';
import { NextRequest } from 'next/server';

// Vercel OGをモック
jest.mock('@vercel/og', () => ({
  ImageResponse: jest.fn(),
}));

// Responseオブジェクトをモック
global.Response = jest.fn();

describe('/api/seats/imgPng POST', () => {
  const { ImageResponse } = require('@vercel/og');

  beforeEach(() => {
    jest.clearAllMocks();
    
    // ImageResponseのモック設定
    ImageResponse.mockImplementation((element, options) => ({
      element,
      options,
      status: 200,
      headers: { 'Content-Type': 'image/png' }
    }));
    
    // Responseのモック設定
    global.Response.mockImplementation((body, options) => ({
      body,
      ...options,
    }));
  });

  describe('成功ケース', () => {
    it('背景画像ありで座席マップ画像を生成する', async () => {
      const requestData = {
        bg: 'https://example.com/background.jpg',
        boxes: [
          {
            id: 'seat1',
            name: 'A1',
            x: 100,
            y: 200,
            status: 'movable'
          },
          {
            id: 'seat2',
            name: 'B1',
            x: 200,
            y: 300,
            status: 'reserved'
          }
        ],
        width: 800,
        height: 600
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(ImageResponse).toHaveBeenCalledWith(
        expect.any(Object),
        { width: 800, height: 600 }
      );
      
      // ImageResponseに渡されたJSX要素の構造を確認
      const [jsxElement, options] = ImageResponse.mock.calls[0];
      expect(options).toEqual({ width: 800, height: 600 });
    });

    it('背景画像なしで座席マップ画像を生成する', async () => {
      const requestData = {
        boxes: [
          {
            id: 'seat1',
            name: 'A1',
            x: 100,
            y: 200,
            status: 'fixed'
          }
        ],
        width: 400,
        height: 300
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(ImageResponse).toHaveBeenCalledWith(
        expect.any(Object),
        { width: 400, height: 300 }
      );
    });

    it('座席なしで背景のみの画像を生成する', async () => {
      const requestData = {
        bg: 'https://example.com/background.jpg',
        boxes: [],
        width: 500,
        height: 400
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(ImageResponse).toHaveBeenCalledWith(
        expect.any(Object),
        { width: 500, height: 400 }
      );
    });

    it('全ての座席ステータスが正しく処理される', async () => {
      const requestData = {
        boxes: [
          { id: 'seat1', name: 'A1', x: 100, y: 100, status: 'movable' },
          { id: 'seat2', name: 'B1', x: 200, y: 100, status: 'fixed' },
          { id: 'seat3', name: 'C1', x: 300, y: 100, status: 'unused' },
          { id: 'seat4', name: 'D1', x: 400, y: 100, status: 'reserved' },
          { id: 'seat5', name: 'E1', x: 500, y: 100, status: 'unknown' } // 未定義ステータス
        ],
        width: 800,
        height: 600
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(ImageResponse).toHaveBeenCalled();
    });
  });

  describe('バリデーションエラー', () => {
    it('widthが未指定の場合はエラーを返す', async () => {
      const requestData = {
        bg: 'https://example.com/background.jpg',
        boxes: [],
        height: 600
        // width未指定
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(global.Response).toHaveBeenCalledWith(
        JSON.stringify({ error: '画像サイズ（width, height）が指定されていません' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    });

    it('heightが未指定の場合はエラーを返す', async () => {
      const requestData = {
        bg: 'https://example.com/background.jpg',
        boxes: [],
        width: 800
        // height未指定
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(global.Response).toHaveBeenCalledWith(
        JSON.stringify({ error: '画像サイズ（width, height）が指定されていません' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    });

    it('widthとheightが両方未指定の場合はエラーを返す', async () => {
      const requestData = {
        bg: 'https://example.com/background.jpg',
        boxes: []
        // width, height未指定
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(global.Response).toHaveBeenCalledWith(
        JSON.stringify({ error: '画像サイズ（width, height）が指定されていません' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    });

    it('widthが0の場合はエラーを返す', async () => {
      const requestData = {
        boxes: [],
        width: 0,
        height: 600
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(global.Response).toHaveBeenCalledWith(
        JSON.stringify({ error: '画像サイズ（width, height）が指定されていません' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    });

    it('heightが0の場合はエラーを返す', async () => {
      const requestData = {
        boxes: [],
        width: 800,
        height: 0
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(global.Response).toHaveBeenCalledWith(
        JSON.stringify({ error: '画像サイズ（width, height）が指定されていません' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    });
  });

  describe('背景画像処理', () => {
    it('HTTPSの背景画像URLが正しく処理される', async () => {
      const requestData = {
        bg: 'https://example.com/background.jpg',
        boxes: [],
        width: 800,
        height: 600
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(ImageResponse).toHaveBeenCalled();
    });

    it('HTTPの背景画像URLが正しく処理される', async () => {
      const requestData = {
        bg: 'http://example.com/background.jpg',
        boxes: [],
        width: 800,
        height: 600
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(ImageResponse).toHaveBeenCalled();
    });

    it('相対パスの背景画像は無視される', async () => {
      const requestData = {
        bg: '/images/background.jpg',
        boxes: [],
        width: 800,
        height: 600
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(ImageResponse).toHaveBeenCalled();
    });

    it('無効なプロトコルの背景画像は無視される', async () => {
      const requestData = {
        bg: 'ftp://example.com/background.jpg',
        boxes: [],
        width: 800,
        height: 600
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(ImageResponse).toHaveBeenCalled();
    });
  });

  describe('座席ボックス処理', () => {
    it('boxesが配列でない場合も正常に処理される', async () => {
      const requestData = {
        boxes: null,
        width: 800,
        height: 600
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(ImageResponse).toHaveBeenCalled();
    });

    it('boxesが未定義の場合も正常に処理される', async () => {
      const requestData = {
        width: 800,
        height: 600
        // boxes未定義
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(ImageResponse).toHaveBeenCalled();
    });

    it('座席の位置と名前が正しく設定される', async () => {
      const requestData = {
        boxes: [
          {
            id: 'seat1',
            name: 'テスト座席',
            x: 150,
            y: 250,
            status: 'movable'
          }
        ],
        width: 800,
        height: 600
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(ImageResponse).toHaveBeenCalled();
    });
  });

  describe('エラーハンドリング', () => {
    it('ImageResponse生成エラーが発生した場合は500エラーを返す', async () => {
      ImageResponse.mockImplementation(() => {
        throw new Error('Image generation failed');
      });
  
      const requestData = {
        boxes: [],
        width: 800,
        height: 600
      };
  
      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });
  
      const response = await POST(request);
  
      // 実際に呼ばれた引数を取得して検証
      const [responseBody, responseOptions] = global.Response.mock.calls[0];
      const parsedBody = JSON.parse(responseBody);
      
      expect(parsedBody.error).toBe('Image generation failed');
      expect(typeof parsedBody.stack).toBe('string');
      expect(parsedBody.stack.length).toBeGreaterThan(0);
      expect(responseOptions).toEqual({
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    });
  
    it('予期しないエラーが発生した場合は500エラーを返す', async () => {
      // req.jsonでエラーを発生させる
      const request = {
        json: jest.fn().mockRejectedValue(new Error('Unexpected error'))
      };
  
      const response = await POST(request);
  
      // 実際に呼ばれた引数を取得して検証
      const [responseBody, responseOptions] = global.Response.mock.calls[0];
      const parsedBody = JSON.parse(responseBody);
      
      expect(parsedBody.error).toBe('Unexpected error');
      expect(typeof parsedBody.stack).toBe('string');
      expect(parsedBody.stack.length).toBeGreaterThan(0);
      expect(responseOptions).toEqual({
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    });
  });
  

  describe('Edge Runtime設定', () => {
    it('runtimeがedgeに設定されている', () => {
      const { runtime } = require('@/app/api/seats/imgPng/route');
      expect(runtime).toBe('edge');
    });
  });

  describe('レスポンス形式', () => {
    it('成功時は正しい形式でImageResponseを返す', async () => {
      const requestData = {
        boxes: [
          {
            id: 'seat1',
            name: 'A1',
            x: 100,
            y: 200,
            status: 'movable'
          }
        ],
        width: 800,
        height: 600
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(response).toHaveProperty('element');
      expect(response).toHaveProperty('options');
      expect(response.options).toEqual({ width: 800, height: 600 });
    });

    it('エラー時は正しいJSONレスポンスを返す', async () => {
      const requestData = {
        boxes: [],
        // width, height未指定
      };

      const request = new NextRequest('http://localhost:3000/api/seats/imgPng', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const response = await POST(request);

      expect(global.Response).toHaveBeenCalledWith(
        expect.stringContaining('error'),
        expect.objectContaining({
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      );
    });
  });
});
