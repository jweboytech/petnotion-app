import Popup, { PopupRef } from "@/components/popup";
import Row from "@/components/row";
import { FontAwesome6 } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { CircleCheck } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import Column from "./column";
import Avatar from "./avatar";
import { supabase } from "@/lib/supabase";
import { checkIsAuthedUser } from "@/utils/supabase";
import { toast } from "@/utils";
import { usePetStore } from "@/store/pet";

const PetPopup = ({ pets }: { pets: Pet[] }) => {
  const popupRef = React.useRef<PopupRef>(null);
  const [petId, setPetId] = React.useState<string>();
  const setCurrPet = usePetStore((state) => state.setCurrPet);

  const handleAddPet = () => {
    popupRef.current?.onToggle();
    router.push("/pet-form");
  };

  const handlePress = (record: Pet) => async () => {
    checkIsAuthedUser(async (userId) => {
      console.log(record, userId);
      const { error } = await supabase.from("user_pet_settings").upsert(
        {
          user_id: userId,
          pet_id: record.id,
        },
        { onConflict: "user_id" }
      );

      if (error) {
        toast(error.message);
        return;
      }

      setCurrPet(record);
      setPetId(record.id);
      setTimeout(() => {
        popupRef.current?.onToggle();
      }, 600);
    });
  };

  React.useEffect(() => {
    checkIsAuthedUser(async (userId) => {
      const { data, error } = await supabase
        .from("user_pet_settings")
        .select("pet_id")
        .eq("user_id", userId)
        .single();

      if (error == null) {
        setPetId(data?.pet_id);
      }
    });
  });

  return (
    <Popup
      ref={popupRef}
      trigger={<FontAwesome6 name="paw" size={24} color="black" />}
    >
      <ScrollView style={styles.container}>
        <Column gap={16} style={styles.list}>
          {pets.map((item) => (
            <Card key={item.id} onPress={handlePress(item)}>
              <Row
                justifyContent="space-between"
                alignItems="center"
                borderColor="#eee"
                borderRadius={16}
                paddingVertical={16}
                paddingHorizontal={8}
                borderWidth={1}
              >
                <Row gap={8} alignItems="center">
                  <Avatar uri={item.photo} />
                  <Text>{item.name}</Text>
                </Row>
                <React.Fragment>
                  {petId === item.id && <CircleCheck />}
                </React.Fragment>
              </Row>
            </Card>
          ))}
        </Column>
      </ScrollView>
      <Button mode="contained" onPress={handleAddPet}>
        Add Pet
      </Button>
    </Popup>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
  list: {
    height: 200,
  },
});

export default PetPopup;
