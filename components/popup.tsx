import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ReactNativeModal from "react-native-modal";

export interface PopupRef {
  onToggle: VoidFunction;
}

export interface PopupProps {
  trigger?: React.ReactElement;
  children: React.ReactElement | React.ReactElement[];
}

const Popup = React.forwardRef<PopupRef, PopupProps>(
  ({ children, trigger }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const handleToggle = () => {
      setIsVisible(!isVisible);
    };

    React.useImperativeHandle(ref, () => ({ onToggle: handleToggle }));

    return (
      <React.Fragment>
        {trigger && <Pressable onPress={handleToggle}>{trigger}</Pressable>}
        <ReactNativeModal
          isVisible={isVisible}
          onBackdropPress={handleToggle}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          useNativeDriver={true}
          style={styles.popup}
        >
          {isVisible && <View style={styles.container}>{children}</View>}
        </ReactNativeModal>
      </React.Fragment>
    );
  }
);

const styles = StyleSheet.create({
  popup: {
    justifyContent: "flex-end",
    margin: 0, // 去除边距才能贴底显示
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default Popup;
