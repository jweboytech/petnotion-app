import Row from "@/components/row";
import MainLayout from "@/layout/main";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import PetPopup from "../../../components/petPopup";
import { supabase } from "@/lib/supabase";
import { useFocusEffect } from "expo-router";
import { checkIsAuthedUser, fetchData, fetchDataById } from "@/utils/supabase";
import { usePetManager } from "@/hooks/usePetManager";
import { usePetStore } from "@/store/pet";
import Button from "@/components/button";

const HomeScreen = () => {
  const { getCurrPet } = usePetManager();
  const setCurrPet = usePetStore((state) => state.setCurrPet);
  const [pets, setPets] = React.useState<Pet[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      getCurrPet().then((pet) => {
        setCurrPet(pet);
      });

      fetchData<Pet>("pets").then((data) => {
        setPets(data);
      });
    }, [])
  );

  return (
    <MainLayout>
      <Row justifyContent="space-between">
        <Text>Pet Notion</Text>
        <PetPopup pets={pets} />
      </Row>
      <Button mode="contained" href="/event-form">
        Event Form
      </Button>
    </MainLayout>
  );
};

export default HomeScreen;
