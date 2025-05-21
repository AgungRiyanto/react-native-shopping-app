import { useGetProductCategoriesQuery } from '@/services/product';
import Colors from '@/styles/Colors';
import { scale } from '@/utils/helpers';
import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Text from '../atoms/general/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigations/RootNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type Props = {
  onSelectItem: (slug: string) => void;
};

const CategoryList: React.FC<Props> = ({ onSelectItem }) => {
  const { data, isLoading, error } = useGetProductCategoriesQuery();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [activeTab, setActiveTab] = useState('');

  const cartQty = useMemo(() => {
    return cartItems.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0
    );
  }, [cartItems]);

  useEffect(() => {
    if (data && data.length) {
      setActiveTab(data[0].slug);
    }
  }, [data]);

  useEffect(() => {
    if (activeTab) {
      onSelectItem(activeTab);
    }
  }, [activeTab]);

  return (
    <View style={{ marginVertical: scale(13) }}>
      <View style={styles.header}>
        <Text type='bold' size={18}>
          Category
        </Text>
        <View style={[styles.row, { gap: scale(13) }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductSearchScreen')}
          >
            <AntDesign name='search1' size={27} color={Colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ShoppingCartScreen')}
          >
            {cartQty ? (
              <View style={styles.badge}>
                <Text color={Colors.white}>{cartQty}</Text>
              </View>
            ) : null}
            <AntDesign name='shoppingcart' size={27} color={Colors.black} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map((item) => {
          const isActive = item.slug === activeTab;
          return (
            <TouchableOpacity
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              key={item.slug}
              onPress={() => setActiveTab(item.slug)}
            >
              <Text
                type={isActive ? 'medium' : 'regular'}
                color={isActive ? Colors.white : Colors.black}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  tabItem: {
    padding: scale(13),
    backgroundColor: Colors.grey,
    marginLeft: scale(13),
    borderRadius: scale(13),
  },
  tabItemActive: {
    backgroundColor: Colors.black,
  },
  header: {
    paddingVertical: scale(13),
    paddingHorizontal: scale(13),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    width: scale(20),
    height: scale(20),
    backgroundColor: Colors.primary,
    position: 'absolute',
    borderRadius: scale(100),
    top: -10,
    right: -7,
    alignItems: 'center',
  },
});
