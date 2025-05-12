import React from "react";
import { FAB, PaperProvider, Portal } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
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

  const handleOpenMomentForm = () => {
    router.push("/moment-form");
  };

  const actions = [
    {
      icon: "star",
      label: "Moment",
      onPress: handleOpenMomentForm,
    },
    {
      icon: "dog",
      label: "Paw",
      onPress: () => console.log("Pressed email"),
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
