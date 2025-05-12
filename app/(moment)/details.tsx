import ParallaxScrollView from "@/components/ParallaxScrollView";
import useEventManager from "@/hooks/useEventManager";
import MainLayout from "@/layout/main";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { Card, Text } from "react-native-paper";

const MomentDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getMomentDetailsById, petMoment, isLoading } = useEventManager();
  console.log(id);

  React.useEffect(() => {
    getMomentDetailsById(id);
  }, []);

  return (
    <MainLayout isLoading={isLoading}>
      <Card>
        <Card.Cover
          source={{ uri: petMoment?.pet_event_photos[0]?.photo_url }}
        />
        <Card.Content>
          <Text variant="titleLarge">{petMoment?.title}</Text>
          <Text variant="bodySmall">{petMoment?.description}</Text>
        </Card.Content>
      </Card>
    </MainLayout>
  );
};

export default MomentDetails;
