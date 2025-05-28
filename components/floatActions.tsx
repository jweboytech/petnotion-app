import React from "react";
import { FAB, PaperProvider, Portal } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { RelativePathString, router } from "expo-router";
import PetPopup from "./petPopup";
import { usePetManager } from "@/hooks/usePetManager";

export interface FloatActionsProps {}

const FloatActions = ({}: FloatActionsProps) => {
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = React.useState(false);
  const { allPets, getAllPets } = usePetManager();

  const handleToggleStatus = ({ open }: { open: boolean }) => {
    setIsOpen(open);
  };

  const handleNavigate = (url: any) => () => {
    router.push(url);
  };

  const actions = [
    {
      icon: "star",
      label: "Moment",
      onPress: handleNavigate("/moment-form"),
    },
    {
      icon: "dog",
      label: "Paw",
      onPress: handleNavigate("/(pet)/choose"),
    },
  ];

  React.useEffect(() => {
    getAllPets();
  }, []);

  return (
    <React.Fragment>
      <FAB.Group
        visible
        open={isOpen}
        icon="paw"
        onStateChange={handleToggleStatus}
        style={[styles.fabGroup, { bottom: insets.bottom + 70 }]}
        actions={actions}
      />
      {/* <PetPopup pets={allPets} /> */}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  fabGroup: {
    position: "absolute",
    right: 16,
  },
});

export default FloatActions;
