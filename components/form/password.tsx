import React from "react";
import {
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
} from "react-hook-form";
import Input, { InputProps } from "../textInput";
import PasswordInput from "../textInput/password";

export interface PasswordInputFieldProps<T extends FieldValues>
  extends Pick<UseControllerProps<T>, "rules" | "control">,
    Omit<InputProps, "onChange"> {
  placeholder?: string;
  name: Path<T>;
}

function PasswordInputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: PasswordInputFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => {
        return (
          <PasswordInput
            label={label}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
        );
      }}
    />
  );
}

export default PasswordInputField;
