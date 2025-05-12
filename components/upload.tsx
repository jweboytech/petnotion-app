import React from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { toast } from "@/utils";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import { Upload as UploadIcon } from "lucide-react-native";
import Column from "./column";
import { supabase } from "@/lib/supabase";
import Row from "./row";

export interface UploadProps {
  onChange: (param: string) => void;
  value: string;
  bucket?: string;
}

// 限制为 5MB（单位字节）
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function Upload({ onChange, value, bucket = "avatars" }: UploadProps) {
  const [image, setImage] = React.useState<string>("");
  const [isUploading, setIsUploading] = React.useState(false);

  const handleUpload = async () => {
    try {
      // 获取媒体资源访问权限
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        toast("需要访问相册权限才能上传图片");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        const fileUri = asset.uri;
        const fileExt = fileUri.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        // 获取文件大小
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists && fileInfo.size && fileInfo.size > MAX_FILE_SIZE) {
          toast("The image is too large, please select an image under 5MB.");
          return;
        }

        setIsUploading(true);

        // 用 base64 编码读取文件内容
        const fileContent = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // 转成 Uint8Array 二进制数据
        const byteArray = Uint8Array.from(atob(fileContent), (char) =>
          char.charCodeAt(0)
        );

        // 上传到 storage
        const { data: file, error } = await supabase.storage
          .from(bucket)
          .upload(fileName, byteArray, {
            // 文件类型
            contentType: asset.mimeType || "image/jpeg",
            // 文件覆盖
            upsert: true,
          });

        if (error) {
          throw error;
        }

        // 获取公共可访问链接
        const { data } = await supabase.storage
          .from(bucket)
          .getPublicUrl(file?.path!);

        setImage(fileUri);
        onChange?.(data.publicUrl);
      }
    } catch (error) {
      console.log("error", error);
      toast("Image upload failed, please try again later");
    } finally {
      setIsUploading(false);
    }
  };

  React.useEffect(() => {
    if (value) {
      setImage(value);
    }
  }, [value]);

  return (
    <Column gap={24}>
      <TouchableOpacity onPress={handleUpload} style={styles.container}>
        <Row gap={8}>
          {!isUploading ? (
            !image ? (
              <React.Fragment>
                <UploadIcon size={16} />
                <Text style={styles.placeholder}>Choose photo</Text>
              </React.Fragment>
            ) : (
              <Image uri={image} style={styles.image} resizeMode="cover" />
            )
          ) : (
            <React.Fragment>
              <ActivityIndicator />
              <Text style={styles.placeholder}>Uploading</Text>
            </React.Fragment>
          )}
        </Row>
      </TouchableOpacity>
    </Column>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    height: 200,
    overflow: "hidden",
  },
  image: {
    width: 400,
    height: 200,
  },
  placeholder: {
    color: "#888",
  },
});

export default Upload;
