import React from "react";
import {
  Image,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TextInputProps,
  View,
} from "react-native";
import { InputProps } from ".";
import Column from "../column";
import Row from "../row";
import { TextInput } from "react-native-paper";
import Icon from "../icon";

export interface PasswordInputProps
  extends InputProps,
    Omit<TextInputProps, "onChange"> {
  error?: string;
}

const PasswordInput = ({
  label,
  value,
  onChange,
  placeholder,
  error,
}: PasswordInputProps) => {
  // const [isFocus, setIsFocus] = React.useState(false);
  const [isSecured, setIsSecured] = React.useState(true);

  // const handleFocus = () => {
  //   setIsFocus(true);
  // };

  // const handleBlur = () => {
  //   setIsFocus(false);
  // };

  const handleToggleVisible = () => {
    setIsSecured(!isSecured);
  };

  return (
    <Column gap={8}>
      <React.Fragment>{label && <Text>{label}</Text>}</React.Fragment>
      <Row gap={8} alignItems="center">
        <TextInput
          onChangeText={onChange}
          placeholder={placeholder}
          value={value}
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={isSecured}
          textContentType="oneTimeCode" // 伪装为验证码输入框
          autoComplete="off" // 禁止自动填充
          importantForAutofill="no" // Android 防止自动填充
          right={
            <TextInput.Affix
              text={
                <Pressable onPress={handleToggleVisible}>
                  <Icon name={!isSecured ? "Eye" : "EyeOff"} />
                </Pressable>
              }
            />
          }
        />
      </Row>
    </Column>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
});

export default PasswordInput;
