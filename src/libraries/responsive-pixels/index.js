import {Dimensions, PixelRatio} from 'react-native';
// based on figma scale
const BASE_WIDTH = 375;
const BASE_HEIGHT = 835;

const widthScaleFactor = () => {
  const {width: deviceWidth} = Dimensions.get('window');
  const scaleFactor = deviceWidth / BASE_WIDTH;
  return scaleFactor;
};

const heightScaleFactor = () => {
  const {height: deviceHeight} = Dimensions.get('window');
  const scaleFactor = deviceHeight / BASE_HEIGHT;
  return scaleFactor;
};

const fontScaleFactor = () => {
  return Math.max(widthScaleFactor(), heightScaleFactor());
};

const scaledHorizontalPixels = pixels => {
  const scaledPixels = PixelRatio.roundToNearestPixel(
    widthScaleFactor() * pixels,
  );
  return scaledPixels;
};

const scaledVerticalPixels = pixels => {
  const scaledPixels = PixelRatio.roundToNearestPixel(
    heightScaleFactor() * pixels,
  );
  return scaledPixels;
};

const scaledFontSize = pixels => {
  const scaledPixels = PixelRatio.roundToNearestPixel(
    fontScaleFactor() * pixels,
  );
  return scaledPixels;
};

export {
  scaledFontSize as fpx,
  scaledVerticalPixels as vpx,
  scaledHorizontalPixels as hpx,
};
