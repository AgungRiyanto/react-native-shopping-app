import { RootStackParamList } from '@/navigations/RootNavigation';
import Colors from '@/styles/Colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import { View } from 'react-native';
import Text from '../atoms/general/Text';

const Splash = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('ProductListScreen');
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text color={Colors.black} type='medium' size={30}>
        Shop
        <Text type='boldItalic' size={40} color={Colors.primary}>
          App
        </Text>
      </Text>
    </View>
  );
};

export default Splash;
