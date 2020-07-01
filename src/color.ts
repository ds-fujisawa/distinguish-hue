export const hex2hsv = (hex: string) => {
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

export const distinguishHue = (hsv: number[]) => {
  const [h, s, v] = hsv;
  if (s < .02 || v < .19) return '白黒';

  const y = 5 ** (-6 * s);
  if (v < y) return '白黒';

  if ((0 <= h && h <= 22) || (345 <= h && h <= 360)) return 'レッド';
  if (20 <= h && h <= 45) return 'オレンジ';
  if (40 <= h && h <= 72) return 'イエロー';
  if (70 <= h && h <= 162) return 'グリーン';
  if (160 <= h && h <= 177) return '青緑';
  if (175 <= h && h <= 210) return 'ライトブルー';
  if (208 <= h && h <= 255) return 'ダークブルー';
  if (250 <= h && h <= 300) return 'パープル';
  if (295 <= h && h <= 350) return 'ピンク';
  return '白黒';
};