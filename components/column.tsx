import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

export interface ColumnProps extends ComponentBaseProps, ViewStyle {
  style?: ViewStyle;
}

const Column = ({ style, children, ...restProps }: ColumnProps) => {
  const allStyle = { ...styles.container, ...style, ...restProps };

  return <View style={allStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
});

export default Column;
