import {
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
} from '@/services/product';
import Colors from '@/styles/Colors';
import { scale, widthPercentage } from '@/utils/helpers';
import React, { useState } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import ProductCard from '../molecules/ProductCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Text from '../atoms/general/Text';

const ProductSearch = () => {
  const navigation = useNavigation();

  const [keyword, setKeyword] = useState('');
  const { data, isLoading } = useSearchProductsQuery(keyword, {});

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back-outline' size={23} color={Colors.black} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <AntDesign name='search1' size={20} color={Colors.black} />
          <TextInput
            value={keyword}
            onChangeText={(text) => setKeyword(text)}
            placeholder='Search...'
            style={styles.searchInput}
            placeholderTextColor={Colors.textGrey}
          />
        </View>
      </View>
      <FlatList
        data={data?.products || []}
        numColumns={2}
        renderItem={({ item }) => <ProductCard item={item} />}
        columnWrapperStyle={{ gap: 10, paddingHorizontal: 16, flexGrow: 1 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 20, marginTop: 13 }}
        ListEmptyComponent={
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            {isLoading ? (
              <ActivityIndicator size={'large'} color={Colors.primary} />
            ) : (
              <Text>Product not found...</Text>
            )}
          </View>
        }
      />
    </View>
  );
};

export default ProductSearch;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(13),
    padding: scale(16),
    backgroundColor: Colors.white,
  },
  searchContainer: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(13),
    borderRadius: scale(13),
    overflow: 'hidden',
    gap: scale(10),
  },
  searchInput: {
    // flex: 1,
    width: widthPercentage(70),
    paddingVertical: scale(16),
    fontFamily: 'Montserrat-Regular',
    color: Colors.black,
  },
});
