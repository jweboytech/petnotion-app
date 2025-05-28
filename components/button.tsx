import { RelativePathString, router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import {
  Button as PaperButton,
  ButtonProps as PaperButtonProps,
} from "react-native-paper";

interface ButtonProps extends PaperButtonProps {
  onPress?: VoidFunction;
  isDisabled?: boolean;
  className?: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  isDisabled = false,
  href,
  ...restProps
}) => {
  const handlePress = () => {
    if (href) {
      router.push(href);
    } else {
      onPress?.();
    }
  };

  return (
    <PaperButton
      {...restProps}
      style={styles.button}
      onPress={handlePress}
      disabled={isDisabled}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 44,
  },
});

export default Button;
