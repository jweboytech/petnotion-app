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
import useEventManager from "@/hooks/useEventManager";
import { Card } from "react-native-paper";
import Column from "@/components/column";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image } from "react-native-expo-image-cache";

const HomeScreen = () => {
  const { getCurrPet, currPet } = usePetManager();
  const setCurrPet = usePetStore((state) => state.setCurrPet);
  const [pets, setPets] = React.useState<Pet[]>([]);
  const { getUserEvents, userEvents } = useEventManager();

  useFocusEffect(
    React.useCallback(() => {
      Promise.all([getCurrPet(), fetchData<Pet>("pets"), getUserEvents()]).then(
        ([petData, petList]) => {
          setCurrPet(petData);
          setPets(petList);
        }
      );
    }, [])
  );

  return (
    <ParallaxScrollView
      headerImage={
        currPet?.photo ? (
          <Image style={{ height: 240 }} uri={currPet.photo} />
        ) : (
          <View />
        )
      }
    >
      <MainLayout>
        <Column gap={16}>
          <Row justifyContent="space-between">
            <Text>Pet Notion</Text>
            <PetPopup pets={pets} />
          </Row>
          <React.Fragment>
            {userEvents.map((item) => (
              <Card key={item.id}>
                <Card.Title title={item.title} subtitle={item.created_at} />
              </Card>
            ))}
          </React.Fragment>
          <Button mode="contained" href="/event-form">
            Add Moments
          </Button>
        </Column>
      </MainLayout>
    </ParallaxScrollView>
  );
};

export default HomeScreen;
