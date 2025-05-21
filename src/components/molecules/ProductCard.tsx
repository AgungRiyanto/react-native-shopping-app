import React from 'react';
import Text from '@/components/atoms/general/Text';
import {
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { deviceWidth, scale } from '@/utils/helpers';
import Colors from '@/styles/Colors';
import { IProduct } from '@/interfaces/product';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigations/RootNavigation';
import Button from '../atoms/general/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

type Props = {
  item: IProduct;
};

const ProductCard: React.FC<Props> = ({ item }) => {
  const { title, thumbnail, brand, price } = item;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    ToastAndroid.show('Successfully added to cart', 2000);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('ProductDetailScreen', { id: item.id })
      }
    >
      {/* <TouchableOpacity onPress={() => alert('ss')} style={styles.favoriteBtn}>
        <MaterialIcons
          name='favorite-outline'
          size={23}
          color={Colors.textGrey}
        />
      </TouchableOpacity> */}
      <Image
        source={{
          uri: thumbnail,
        }}
        style={styles.image}
      />
      <Text type='bold' size={16}>
        {title}
      </Text>
      <Text size={10} type='medium' color={Colors.textGrey}>
        {brand}
      </Text>
      <View style={styles.rowBetween}>
        <Text size={20} type='bold' color={Colors.primary}>
          ${price}
        </Text>
        <Button
          onPress={handleAddToCart}
          icon={<Ionicons name='cart-outline' size={23} color={Colors.white} />}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    padding: scale(13),
    elevation: 2,
    margin: 1,
    backgroundColor: Colors.white,
    borderRadius: scale(20),
    width: deviceWidth() / 2 - scale(20),
  },
  image: {
    width: 150,
    height: 200,
    alignSelf: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(13),
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    padding: scale(10),
    borderRadius: scale(10),
  },
  favoriteBtn: {
    position: 'absolute',
    top: scale(13),
    right: scale(13),
  },
});
