import React from "react";
import { StyleSheet, Text, TextInputProps, View } from "react-native";
import { TextInput } from "react-native-paper";
import Column from "../column";
import Row from "../row";

export interface InputProps extends Omit<TextInputProps, "onChange"> {
  label?: string;
  onChange: (value: string) => void;
  endContent?: React.ReactElement;
  height?: number;
}

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  endContent,
  height,
  editable = true,
}: InputProps) => {
  // const [isFocus, setIsFocus] = React.useState(false);

  // const handleFocus = () => {
  //   setIsFocus(true);
  // };

  // const handleBlur = () => {
  //   setIsFocus(false);
  // };

  return (
    <Column gap={8}>
      <React.Fragment>{label && <Text>{label}</Text>}</React.Fragment>
      <TextInput
        onChangeText={onChange}
        placeholder={placeholder}
        value={value}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
      />
    </Column>
  );
};

export default Input;
