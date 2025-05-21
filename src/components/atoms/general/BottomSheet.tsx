import React, { useEffect, useRef, ReactNode } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const BOTTOM_SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.6;
const BOTTOM_SHEET_MIN_HEIGHT = SCREEN_HEIGHT * 0.1;
const DRAG_THRESHOLD = 50;

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: number;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  height,
}) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  const sheetActualHeight = height || BOTTOM_SHEET_MAX_HEIGHT;

  useEffect(() => {
    if (visible) {
      Animated.timing(animatedHeight, {
        toValue: sheetActualHeight,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      pan.setValue({ x: 0, y: 0 });
    }
  }, [visible, sheetActualHeight, animatedHeight, pan]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          // Only allow dragging down
          pan.setValue({ x: 0, y: gestureState.dy });
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > DRAG_THRESHOLD) {
          onClose();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const sheetStyle = {
    transform: [{ translateY: pan.y }],
  };

  if (!visible && animatedHeight._value === 0) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType='none'
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            { height: animatedHeight },
            sheetStyle,
          ]}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.draggableArea} {...panResponder.panHandlers}>
            <View style={styles.dragHandle} />
          </View>
          <View style={styles.contentContainer}>{children}</View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  draggableArea: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});

export default BottomSheet;
