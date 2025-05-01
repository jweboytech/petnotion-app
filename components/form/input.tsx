import React from "react";
import {
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
} from "react-hook-form";
import Input, { InputProps } from "../textInput";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Column from "../column";

export interface InputFieldProps<T extends FieldValues>
  extends Pick<UseControllerProps<T>, "rules" | "control">,
    Omit<InputProps, "onChange"> {
  placeholder?: string;
  name: Path<T>;
  extra?: string | React.ReactElement;
}

function InputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  endContent,
  height,
  editable,
}: InputFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Column>
          <Input
            editable={editable}
            height={height}
            label={label}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            endContent={endContent}
          />
          <React.Fragment>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </React.Fragment>
        </Column>
      )}
    />
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default InputField;
