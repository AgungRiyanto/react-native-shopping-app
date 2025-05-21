import Colors from '@/styles/Colors';
import { scale } from '@/utils/helpers';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

type Props = {
  items: string[];
  activeIndex: number;
  onSelectItem: (index: number) => void;
};

const ProductImageList: React.FC<Props> = ({
  items,
  activeIndex,
  onSelectItem,
}) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        return (
          <TouchableOpacity
            key={item}
            style={[
              styles.imageWrapper,
              activeIndex === index && {
                borderColor: Colors.primary,
                borderWidth: 2,
              },
            ]}
            onPress={() => onSelectItem(index)}
          >
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ProductImageList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    gap: scale(10),
    backgroundColor: Colors.background,
    paddingBottom: scale(13),
  },
  imageWrapper: {
    width: scale(70),
    height: scale(70),
    borderWidth: 1,
    borderColor: Colors.textGrey,
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
  },
});
