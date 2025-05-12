import Row from "@/components/row";
import MainLayout from "@/layout/main";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PetPopup from "../../../components/petPopup";
import { supabase } from "@/lib/supabase";
import { useFocusEffect } from "expo-router";
import { checkIsAuthedUser, fetchData, fetchDataById } from "@/utils/supabase";
import { usePetManager } from "@/hooks/usePetManager";
import { usePetStore } from "@/store/pet";
import Button from "@/components/button";
import useEventManager from "@/hooks/useEventManager";
import { ActivityIndicator, Card, FAB } from "react-native-paper";
import Column from "@/components/column";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image } from "react-native-expo-image-cache";
import MomentCard from "@/components/momentCard";
import FloatActions from "@/components/floatActions";

const HomeScreen = () => {
  const { getCurrPet, currPet } = usePetManager();
  const setCurrPet = usePetStore((state) => state.setCurrPet);
  const [pets, setPets] = React.useState<Pet[]>([]);
  const { getPetMomentsByUser, petMoments } = useEventManager();
  const [isLoading, setIsLoading] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      Promise.all([getCurrPet(), getPetMomentsByUser()])
        .then(([petData]) => {
          setCurrPet(petData);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [])
  );

  return (
    <React.Fragment>
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
          {!isLoading ? (
            <Column gap={16}>
              <Text style={styles.title}>Moments</Text>
              <React.Fragment>
                {petMoments.map((item) => (
                  <MomentCard data={item} key={item.id} />
                ))}
              </React.Fragment>
            </Column>
          ) : (
            <Row alignItems="center" justifyContent="center" flex={1}>
              <ActivityIndicator size="large" />
            </Row>
          )}
        </MainLayout>
      </ParallaxScrollView>
      <FloatActions />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
});

export default HomeScreen;
