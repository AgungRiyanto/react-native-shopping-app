import { useGetProductsByCategoryQuery } from '@/services/product';
import Colors from '@/styles/Colors';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import Text from '../atoms/general/Text';
import CategoryList from '../molecules/CategoryList';
import ProductCard from '../molecules/ProductCard';

const ProductList = () => {
  const [category, setCategory] = useState('');
  const { data, isLoading, error } = useGetProductsByCategoryQuery(category, {
    skip: !category,
  });

  const handleSelectCategory = (slug: string) => {
    setCategory(slug);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <FlatList
        ListHeaderComponent={
          <CategoryList onSelectItem={handleSelectCategory} />
        }
        data={data?.products || []}
        numColumns={2}
        renderItem={({ item }) => <ProductCard item={item} />}
        columnWrapperStyle={{ gap: 10, paddingHorizontal: 16 }}
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

export default ProductList;
