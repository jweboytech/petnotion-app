import React from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { toast } from "@/utils";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Column from "../column";
import { supabase } from "@/lib/supabase";
import { Image } from "react-native-expo-image-cache";
import Row from "../row";
import {
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
} from "react-hook-form";
import Upload, { UploadProps } from "../upload";

export interface UploadFieldProps<T extends FieldValues>
  extends Pick<UseControllerProps<T>, "rules" | "control">,
    Pick<UploadProps, "bucket"> {
  name: Path<T>;
  label: string;
}

function UploadField<T extends FieldValues>({
  control,
  name,
  label,
  bucket,
}: UploadFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Column>
          <React.Fragment>
            {label && <Text style={styles.label}>{label}</Text>}
          </React.Fragment>
          <Upload onChange={onChange} value={value} bucket={bucket} />
          <React.Fragment>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </React.Fragment>
        </Column>
      )}
    />
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default UploadField;
