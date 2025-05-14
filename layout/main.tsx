import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";
import { ActivityIndicator } from "react-native-paper";

const MainLayout = ({
  children,
  isLoading,
}: ComponentBaseProps & {
  isLoading?: boolean;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <RootSiblingParent>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {!isLoading ? children : <ActivityIndicator size="large" />}
      </View>
    </RootSiblingParent>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
});

export default MainLayout;
