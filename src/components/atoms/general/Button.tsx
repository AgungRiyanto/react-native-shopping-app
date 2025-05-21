import Colors from '@/styles/Colors';
import { scale } from '@/utils/helpers';
import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import Text from './Text';

type Props = {
  title?: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
} & TouchableOpacityProps;

const Button: React.FC<Props> = ({ title, icon, style, ...props }) => {
  return (
    <TouchableOpacity {...props} style={[styles.container, style]}>
      {title ? (
        <Text size={14} color={Colors.white} type='medium'>
          {title}
        </Text>
      ) : null}
      {icon && icon}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: scale(13),
    borderRadius: scale(13),
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
