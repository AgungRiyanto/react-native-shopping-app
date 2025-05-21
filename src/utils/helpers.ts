import { Dimensions, PixelRatio } from 'react-native';

export const DESIGN_WIDTH = 430;
export const DESIGN_HEIGHT = 800;

export const deviceWidth = () => Dimensions.get('window').width;

export const deviceHeight = () => Dimensions.get('window').height;

export const widthPercentage = (value: number) => (deviceWidth() * value) / 100;

export const heightPercentage = (value: number) =>
  (deviceHeight() * value) / 100;

export const scale = (size: number | undefined): number => {
  if (typeof size !== 'number') return 0;

  const scaleWidth = deviceWidth() / DESIGN_WIDTH;
  const scaleHeight = deviceHeight() / DESIGN_HEIGHT;

  // Use the smaller scale for consistency across devices
  const scale = Math.min(scaleWidth, scaleHeight);

  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};
