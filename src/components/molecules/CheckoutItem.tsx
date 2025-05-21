import { IProduct } from '@/interfaces/product';
import Colors from '@/styles/Colors';
import { scale } from '@/utils/helpers';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../atoms/general/Text';

type Props = {
  item: IProduct & { quantity: number };
};

const CheckoutItem: React.FC<Props> = ({ item }) => {
  const { title, price, quantity } = item;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.rowBetween}>
          <View style={{ flex: 1 }}>
            <Text type='bold' size={14}>
              {title}
            </Text>
          </View>
        </View>
        <View style={styles.rowBetween}>
          <Text type='bold' size={16}>
            {quantity}x ${price}
          </Text>
          <Text type='bold' size={16} color={Colors.primary}>
            ${price * quantity}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CheckoutItem;

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
