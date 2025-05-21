import { RootStackParamList } from '@/navigations/RootNavigation';
import { useGetProductByIdQuery } from '@/services/product';
import { addToCart } from '@/store/cartSlice';
import Colors from '@/styles/Colors';
import { deviceWidth, scale } from '@/utils/helpers';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import Button from '../atoms/general/Button';
import Text from '../atoms/general/Text';
import ProductImageList from '../molecules/ProductImageList';

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetailScreen'
>;
const ProductDetail = () => {
  const dispatch = useDispatch();

  const {
    params: { id },
  } = useRoute<ProductDetailScreenRouteProp>();
  const navigation = useNavigation();
  const { data, isLoading } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={Colors.primary} />
      </View>
    );
  }

  if (!data) {
    return <Text>Error</Text>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(data));
    ToastAndroid.show('Successfully added to cart', 2000);
  };
  const {
    title,
    images,
    thumbnail,
    brand,
    rating,
    reviews,
    description,
    price,
  } = data;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back-outline' size={23} color={Colors.black} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={{ backgroundColor: Colors.background }}>
          <Image
            source={{
              uri: images[activeImage],
            }}
            style={styles.image}
            resizeMode='contain'
          />
        </View>
        <ProductImageList
          items={images}
          activeIndex={activeImage}
          onSelectItem={setActiveImage}
        />
        <View style={styles.content}>
          <Text size={15} color={Colors.textGrey}>
            {brand}
          </Text>
          <Text type='bold' size={20}>
            {title}
          </Text>
          <View style={[styles.row, { gap: scale(5) }]}>
            <Ionicons name='star' size={20} color={Colors.yellow} />
            <Text>
              <Text type='bold'> {rating.toFixed(1)}</Text>({reviews.length}{' '}
              Ratings)
            </Text>
          </View>
          <Text color={Colors.textGrey}>{description}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <Text size={14} color={Colors.textGrey}>
            Price
          </Text>
          <Text size={20} type='bold' color={Colors.primary}>
            ${price}
          </Text>
        </View>
        <Button
          onPress={handleAddToCart}
          title={`Add To Cart`}
          style={{ width: deviceWidth() / 2 }}
        />
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  header: {
    padding: scale(13),
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 300,
  },
  content: {
    flex: 1,
    padding: scale(20),
    gap: scale(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(13),
    padding: scale(16),
  },
});
