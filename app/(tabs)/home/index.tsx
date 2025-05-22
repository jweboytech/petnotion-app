import Row from "@/components/row";
import MainLayout from "@/layout/main";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PetPopup from "../../../components/petPopup";
import { supabase } from "@/lib/supabase";
import { Link, RelativePathString, router, useFocusEffect } from "expo-router";
import { checkIsAuthedUser, fetchData, fetchDataById } from "@/utils/supabase";
import { usePetManager } from "@/hooks/usePetManager";
import { usePetStore } from "@/store/pet";
import useEventManager from "@/hooks/useEventManager";
import { ActivityIndicator, Card, FAB } from "react-native-paper";
import Column from "@/components/column";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image } from "react-native-expo-image-cache";
import MomentCard from "@/components/momentCard";
import { formatDate } from "@/utils";

const HomeScreen = () => {
  const { getCurrPet, currPet } = usePetManager();
  const setCurrPet = usePetStore((state) => state.setCurrPet);
  const { getPetMomentsByUser, petMoments } = useEventManager();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCardPress = (id: string) => {
    router.push({ pathname: `/(moment)/details`, params: { id } });
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getCurrPet()
        .then((data) => {
          setCurrPet(data);
          getPetMomentsByUser(data.id);
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
              <Row gap={32}>
                <View style={styles.timeline}>
                  <View style={styles.line} />
                </View>
                <Column flex={1} gap={16}>
                  {petMoments.map((item) => (
                    <View key={item.id} style={styles.item}>
                      <View style={styles.time}>
                        <Text style={styles.date}>
                          {formatDate(item.created_at, "MMMDD, h:mm")}
                        </Text>
                      </View>
                      <MomentCard data={item} onPress={handleCardPress} />
                    </View>
                  ))}
                </Column>
              </Row>
            </Column>
          ) : (
            <Row alignItems="center" justifyContent="center" flex={1}>
              <ActivityIndicator size="large" />
            </Row>
          )}
        </MainLayout>
      </ParallaxScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  timeline: {
    paddingHorizontal: 16,
  },
  line: {
    borderWidth: 1,
    borderColor: "#999",
    height: "100%",
  },
  item: {
    position: "relative",
  },
  time: {
    position: "absolute",
    top: 0,
    left: -70,
    width: 50,
    zIndex: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 6,
  },
  date: {
    fontSize: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
});

export default HomeScreen;
