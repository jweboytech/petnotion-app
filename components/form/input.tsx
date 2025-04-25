import React from "react";
import {
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
} from "react-hook-form";
import Input, { InputProps } from "../textInput";
import { Pressable, View } from "react-native";

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
      render={({ field: { onChange, value } }) => (
        <Input
          editable={editable}
          height={height}
          label={label}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          endContent={endContent}
        />
      )}
    />
  );
}

export default InputField;
