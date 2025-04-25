import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

export interface TextareaProps extends Omit<TextInputProps, "onChange"> {
  label?: string;
  onChange: (value: string) => void;
}

const Textarea = ({ label, placeholder, value, onChange }: TextareaProps) => {
  const [isFocus, setIsFocus] = React.useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <View style={styles.formField}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        multiline
        style={[styles.input, isFocus && styles.highlight]}
        onChangeText={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#9B9DAD"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formField: {
    rowGap: 8,
  },
  label: {
    color: "#A3A4B2",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#2A2E51",
    borderColor: "#4F5165",
    borderWidth: 1,
    borderRadius: 8,
    height: 322,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "#F5F5F5",
    textAlignVertical: "top",
  },
  highlight: {
    borderColor: "#01F3A7",
  },
});

export default Textarea;
