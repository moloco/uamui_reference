import { defaultTheme, majorScale } from 'evergreen-ui';

import { SIZES, SIZE_TO_HEIGHT, SIZE_TO_TEXT_SIZE } from './constants';

const { typography, getTextSizeForControlHeight } = defaultTheme;
const { text, headings } = typography;

// const textStyle = {
//   ...text,
//   '700': headings['700'],
//   '800': headings['800'],
// };

export default {
  ...defaultTheme,
  unit: majorScale(1),
  // getTextColor: (color) => {
  //   const result = getTextColor(color);
  //   console.log('result', result, color);
  //   return result;
  // },
  // getButtonClassName: (...args) => {
  //   const result = getButtonClassName(...args);
  //   console.log(result, ...args);
  //   return result;
  // },
  // getTextSizeForControlHeight: (height) => {
  //   if (SIZE_TO_HEIGHT[SIZES.XLARGE] === height) {
  //     return SIZE_TO_TEXT_SIZE[SIZES.XLARGE];
  //   }
  //   if (SIZE_TO_HEIGHT[SIZES.XXLARGE] === height) {
  //     return SIZE_TO_TEXT_SIZE[SIZES.XXLARGE];
  //   }
  //   return getTextSizeForControlHeight(height);
  // },
  // getTextStyle: (size) => textStyle[size] || textStyle['400'],
};
