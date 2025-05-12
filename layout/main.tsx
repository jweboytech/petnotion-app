import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";

const MainLayout = ({ children }: ComponentBaseProps) => {
  const insets = useSafeAreaInsets();

  return (
    <RootSiblingParent>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {children}
      </View>
    </RootSiblingParent>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

export default MainLayout;
