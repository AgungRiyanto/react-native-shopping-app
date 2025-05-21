import { RootState } from '@/store';
import Colors from '@/styles/Colors';
import { scale } from '@/utils/helpers';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import Text from '../atoms/general/Text';
import CartItem from '../molecules/CartItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Button from '../atoms/general/Button';
import BottomSheet from '../atoms/general/BottomSheet';
import CheckoutItem from '../molecules/CheckoutItem';

const ShoppingCart = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [selected, setSelected] = useState<number[]>([]);
  const [isSheetVisible, setSheetVisible] = useState(false);

  const subTotal = useMemo(() => {
    return cartItems
      .filter((item) => selected.includes(item.id))
      .reduce((accumulator, currentItem) => {
        const itemPrice = currentItem.price * currentItem.quantity;

        return accumulator + itemPrice;
      }, 0)
      .toFixed(2);
  }, [selected, cartItems]);

  const handleSelect = (id: number) => {
    const isSelected = selected.includes(id);
    let newSelected = selected;
    if (isSelected) {
      newSelected.splice(selected.indexOf(id), 1);
    } else {
      newSelected.push(id);
    }

    setSelected([...newSelected]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name='arrow-back-outline'
                size={23}
                color={Colors.black}
              />
            </TouchableOpacity>
            <Text type='bold' size={20}>
              Shopping Cart
            </Text>
          </View>
        }
        data={cartItems || []}
        renderItem={({ item }) => (
          <CartItem
            key={item.id}
            item={item}
            selected={selected.includes(item.id)}
            onSelectChange={handleSelect}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: scale(16) }}
      />
      <View style={styles.footer}>
        <Button
          onPress={() => setSheetVisible(true)}
          title={`Checkout ($${subTotal})`}
          style={{ flex: 1, opacity: selected.length < 1 ? 0.6 : 1 }}
          disabled={selected.length < 1}
        />
      </View>

      <BottomSheet
        visible={isSheetVisible}
        onClose={() => setSheetVisible(false)}
      >
        <ScrollView>
          {cartItems
            .filter((item) => selected.includes(item.id))
            .map((item) => {
              return <CheckoutItem key={`cart-item-${item.id}`} item={item} />;
            })}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: scale(13),
          }}
        >
          <Text size={16} type='medium' color={Colors.black}>
            Total Payment
          </Text>
          <Text size={20} type='bold' color={Colors.primary}>
            ${subTotal}
          </Text>
        </View>
        <Button title='Purchase' onPress={() => setSheetVisible(false)} />
      </BottomSheet>
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(13),
    marginVertical: scale(20),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(13),
    padding: scale(16),
  },
});
