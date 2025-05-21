import { IProduct } from '@/interfaces/product';
import Colors from '@/styles/Colors';
import { scale } from '@/utils/helpers';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from '../atoms/general/Text';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { addToCart, reduceCart, removeFromCart } from '@/store/cartSlice';

type Props = {
  item: IProduct & { quantity: number };
  selected: boolean;
  onSelectChange: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, selected, onSelectChange }) => {
  const { title, price, quantity } = item;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  const handleReduceCart = () => {
    if (quantity > 1) {
      dispatch(reduceCart(item));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSelectChange(item.id)}>
        <MaterialCommunityIcons
          name={selected ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={23}
          color={selected ? Colors.primary : Colors.grey}
        />
      </TouchableOpacity>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.rowBetween}>
          <View style={{ flex: 1 }}>
            <Text type='bold' size={14}>
              {title}
            </Text>
          </View>
          <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
            <Octicons name='trash' size={20} color={Colors.textGrey} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowBetween}>
          <Text type='bold' size={16}>
            ${price}
          </Text>
          <View style={[styles.row, { gap: scale(13) }]}>
            <TouchableOpacity onPress={handleReduceCart}>
              <AntDesign
                name='minuscircleo'
                size={23}
                color={Colors.textGrey}
              />
            </TouchableOpacity>
            <Text size={16}>{quantity}</Text>
            <TouchableOpacity onPress={handleAddToCart}>
              <AntDesign name='pluscircleo' size={23} color={Colors.textGrey} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: scale(13),
    marginTop: scale(10),
    padding: scale(10),
    gap: scale(13),
  },
  image: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    gap: scale(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(5),
  },
});
