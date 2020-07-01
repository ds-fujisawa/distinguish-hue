import { hex2hsv, distinguishHue } from '../src/color';

describe('App', () => {
  test('App', () => {
    const hexList: {[key: string]: string} = {
      '#F2F9F4': 'グリーン',
      '#7F7B75': 'オレンジ',
      '#4D5659': 'ライトブルー',
      '#4C4441': 'レッド',
      '#3E4032': 'イエロー',
      '#392E2F': 'レッド', // ← 白黒にしたいけど厳しそう…
      '#182930': '白黒',
      '#18332F': '青緑',
      '#362D28': 'レッド'
    };
    Object.keys(hexList).forEach(hex => {
      expect(distinguishHue(hex2hsv(hex))).toBe(hexList[hex]);
    });
  });
});