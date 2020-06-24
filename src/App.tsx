import * as React from 'react';
import { ChromePicker, ColorResult } from 'react-color';

const hex2hsv = (hex: string) => {
  let tmpHex = hex;
  if (hex.slice(0, 1) === '#') tmpHex = hex.slice(1);
  if (tmpHex.length === 3) {
    tmpHex =
      hex.slice(0, 1) +
      hex.slice(0, 1) +
      hex.slice(1, 2) +
      hex.slice(1, 2) +
      hex.slice(2, 3) +
      hex.slice(2, 3);
  }
  const [r, g, b] = [
    tmpHex.slice(0, 2),
    tmpHex.slice(2, 4),
    tmpHex.slice(4, 6)
  ].map((str) => parseInt(str, 16) / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  let h = 0;
  const s = max === 0 ? 0 : diff / max;
  const v = max;

  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
      case g: h = (b - r) / diff + 2; break;
      case b: h = (r - g) / diff + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s, v];
};

const distinguishHue = (hsv: number[]) => {
  const [h, s, v] = hsv;
  if (s < .1 || v < .2) return '白黒';

  const y = 4 ** (-2 * s);
  if (v < y) return '白黒';

  if ((0 <= h && h <= 40) || (340 <= h && h <= 360)) return 'レッド';
  if (30 <= h && h <= 60) return 'オレンジ';
  if (40 <= h && h <= 90) return 'イエロー';
  if (80 <= h && h <= 160) return 'グリーン';
  if (150 <= h && h <= 180) return '青緑';
  if (170 <= h && h <= 220) return 'ライトブルー';
  if (210 <= h && h <= 270) return 'ダークブルー';
  if (260 <= h && h <= 300) return 'パープル';
  if (290 <= h && h <= 350) return 'ピンク';
  return '白黒';
};

const App: React.FC = () => {
  const [color, setColor] = React.useState({
    hex: '#000000',
    hsv: [0, 0, 0]
  });
  const chengeColor = (c: ColorResult) => {
    setColor({hex: c.hex, hsv: hex2hsv(c.hex)});
  };

  return <>
  <div style={{display: 'flex'}}>
    <ChromePicker color={color.hex} onChange={chengeColor} />
    <div style={{ width: 300, margin: '0 1rem' }}>
      <div>HEX {color.hex}</div>
      <div>HSV</div>
      <ul>
        <li>H: {color.hsv[0]}</li>
        <li>S: {color.hsv[1]}</li>
        <li>V: {color.hsv[2]}</li>
      </ul>
    </div>
  <div style={{ fontSize: '2rem' }}>{distinguishHue(color.hsv)}</div>
  </div>
  <div style={{ width: 300, height: 300, backgroundColor: color.hex }} />
  </>
};

export default App;
