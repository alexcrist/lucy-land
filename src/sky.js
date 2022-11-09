import tinygradient from 'tinygradient';
import { SKY_BOT_1, SKY_BOT_2, SKY_BOT_3, SKY_TOP_1, SKY_TOP_2, SKY_TOP_3 } from './constants';

const makeGradient = (colors) => {
  return tinygradient(colors)
    .rgb(100)
    .map((color) => color.toHexString());
};

const gradientTop = makeGradient([SKY_TOP_1, SKY_TOP_2, SKY_TOP_3]);
const gradientBot = makeGradient([SKY_BOT_1, SKY_BOT_2, SKY_BOT_3]);

export const setSky = (percent) => {
  const index = Math.min(
    Math.max(
      0, 
      Math.round(percent)
    ),
    99
  );
  const top = gradientTop[index];
  const bot = gradientBot[index];
  document.body.style.background = `linear-gradient(${top}, ${bot}, ${bot})`;
}