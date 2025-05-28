import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { Card, Text } from "react-native-paper";
import Row from "./row";
import Column from "./column";
import { formatDate } from "@/utils";
import { FontAwesome6 } from "@expo/vector-icons";

export interface MomentCardProps {
  data: PetMoment;
  onPress?: (param: string) => void;
}

const MomentCard = ({ data, onPress }: MomentCardProps) => {
  const handlePress = () => {
    onPress?.(data.id);
  };

  return (
    <Card key={data.id} onPress={handlePress}>
      <Row style={styles.container} gap={12}>
        <Column style={styles.description} gap={6}>
          {/* <Row alignItems="center" gap={4}>
            <FontAwesome6 name="paw" size={16} color="black" />
            <Text style={styles.title}>{data.title}</Text>
          </Row> */}
          <Image
            style={styles.cover}
            uri={data.pet_event_photos[0]?.photo_url}
          />
          <Text numberOfLines={2} ellipsizeMode="tail">
            Took Buddy for a nice walk in park.Took Buddy for a nice walk in
            park.Took Buddy for a nice walk in park.
          </Text>
        </Column>
      </Row>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  description: {
    flex: 1,
  },
  cover: {
    height: 160,
    borderRadius: 8,
    objectFit: "cover",
  },
  title: {
    fontWeight: 500,
    fontSize: 18,
  },
  details: {
    fontSize: 14,
  },
});

export default MomentCard;
