/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text as TextNative, TextStyle } from 'react-native';

import { scale } from '@/utils/helpers';
import Colors from '@/styles/Colors';

type FontType = 'regular' | 'medium' | 'mediumItalic' | 'bold' | 'boldItalic';

const getFontType = (type?: FontType) => {
  switch (type) {
    case 'bold':
      return styles.bold;
    case 'medium':
      return styles.medium;
    case 'mediumItalic':
      return styles.mediumItalic;
    case 'boldItalic':
      return styles.boldItalic;
    default:
      return styles.regular;
  }
};

const getCustomStyle = (props: Props) => {
  const {
    padding,
    paddingY,
    paddingX,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    margin,
    marginY,
    marginX,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    color,
    size,
    decoration,
    lineHeight,
    textAlign,
  } = props;
  let customStyle: TextStyle = {
    color: Colors.black,
  };
  if (padding) {
    customStyle.padding = scale(padding);
  }
  if (paddingY) {
    customStyle.paddingVertical = scale(paddingY);
  }
  if (paddingX) {
    customStyle.paddingHorizontal = scale(paddingX);
  }
  if (paddingTop) {
    customStyle.paddingTop = scale(paddingTop);
  }
  if (paddingBottom) {
    customStyle.paddingBottom = scale(paddingBottom);
  }
  if (paddingLeft) {
    customStyle.paddingLeft = scale(paddingLeft);
  }
  if (paddingRight) {
    customStyle.paddingRight = scale(paddingRight);
  }
  if (margin) {
    customStyle.margin = scale(margin);
  }
  if (marginY) {
    customStyle.marginVertical = scale(marginY);
  }
  if (marginX) {
    customStyle.marginHorizontal = scale(marginX);
  }
  if (marginTop) {
    customStyle.marginTop = scale(marginTop);
  }
  if (marginBottom) {
    customStyle.marginBottom = scale(marginBottom);
  }
  if (marginLeft) {
    customStyle.marginLeft = scale(marginLeft);
  }
  if (marginRight) {
    customStyle.marginRight = scale(marginRight);
  }
  if (color) customStyle.color = color;
  if (decoration) customStyle.textDecorationLine = decoration;
  if (lineHeight) customStyle.lineHeight = lineHeight;
  if (size) customStyle.fontSize = scale(size);
  if (textAlign) customStyle.textAlign = textAlign;
  return customStyle;
};

type TextDecorationProps =
  | 'none'
  | 'underline'
  | 'line-through'
  | 'underline line-through';

type TextProps = {
  testID?: string;
  children: any;
  style?: TextStyle;
  color?: string;
  type?: FontType;
  size?: number;
  decoration?: TextDecorationProps;
  numberOfLines?: number;
  lineHeight?: number;
  textAlign?: 'left' | 'center' | 'right';
  padding?: number | undefined;
  paddingY?: number | undefined;
  paddingX?: number | undefined;
  paddingTop?: number | undefined;
  paddingBottom?: number | undefined;
  paddingLeft?: number | undefined;
  paddingRight?: number | undefined;
  margin?: number | undefined;
  marginY?: number | undefined;
  marginX?: number | undefined;
  marginTop?: number | undefined;
  marginBottom?: number | undefined;
  marginLeft?: number | undefined;
  marginRight?: number | undefined;
};

type Props = TextNative['props'] & TextProps;

const Text: React.FC<Props> = (props) => {
  const {
    testID,
    children,
    style,
    color,
    type,
    size,
    decoration,
    numberOfLines,
    lineHeight,
    textAlign,
    padding,
    paddingY,
    paddingX,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    margin,
    marginY,
    marginX,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    ...rest
  } = props;
  const font = getFontType(type);
  const customStyle = getCustomStyle(props);

  return (
    <TextNative
      testID={testID}
      accessibilityLabel={testID}
      numberOfLines={numberOfLines}
      {...rest}
      style={[font, customStyle, style]}
    >
      {children}
    </TextNative>
  );
};

export default React.memo<Props>(Text);

const styles = StyleSheet.create({
  light: {
    fontFamily: 'Montserrat-Light',
  },
  regular: {
    fontFamily: 'Montserrat-Regular',
  },
  medium: {
    fontFamily: 'Montserrat-Medium',
  },
  mediumItalic: {
    fontFamily: 'Montserrat-Italic',
  },
  bold: {
    fontFamily: 'Montserrat-Bold',
  },
  boldItalic: {
    fontFamily: 'Montserrat-BoldItalic',
  },
});
