import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

export interface RowProps extends ComponentBaseProps, ViewStyle {
  style?: ViewStyle;
}

const Row = ({ style, children, ...restProps }: RowProps) => {
  const allStyle = { ...styles.container, ...style, ...restProps };

  return <View style={allStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default Row;
