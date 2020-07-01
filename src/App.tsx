import * as React from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { hex2hsv, distinguishHue } from './color';

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
