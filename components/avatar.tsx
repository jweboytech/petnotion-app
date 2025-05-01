import React from "react";
import { StyleSheet } from "react-native";
import { CacheManager, Image } from "react-native-expo-image-cache";

export interface AvatarProps {
  uri: string;
}

const Avatar = ({ uri }: AvatarProps) => {
  return <Image uri={uri} style={styles.avatar} />;
};

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
  },
});

export default Avatar;
