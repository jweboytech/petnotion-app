import Column from "@/components/column";
import Row from "@/components/row";
import { usePetManager } from "@/hooks/usePetManager";
import MainLayout from "@/layout/main";
import { usePetStore } from "@/store/pet";
import { router, useFocusEffect } from "expo-router";
import { CircleCheck } from "lucide-react-native";
import React from "react";
import { Image } from "react-native-expo-image-cache";
import { Button, Card, Text } from "react-native-paper";

const ChoosePetScreen = () => {
  const {
    allPets,
    getAllPets,
    isLoading,
    currPet,
    getCurrPet,
    setCurrPetData,
  } = usePetManager();
  const setCurrPet = usePetStore((state) => state.setCurrPet);

  const handleAddPet = () => {
    router.push("/pet-form");
  };

  const handleItemPress = (record: Pet) => async () => {
    await setCurrPetData(record.id);
    setCurrPet(record);
    getCurrPet();
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllPets().then(() => {
        getCurrPet();
      });
    }, [])
  );

  return (
    <MainLayout>
      <Column gap={16}>
        <Button mode="contained" onPress={handleAddPet}>
          Add Pet
        </Button>
        <React.Fragment>
          {allPets.map((item) => (
            <Card key={item.id} onPress={handleItemPress(item)}>
              <Card.Cover source={{ uri: item.photo }} />
              <Card.Content>
                <Row
                  alignItems="center"
                  justifyContent="space-between"
                  paddingVertical={12}
                >
                  <Text>{item.name}</Text>
                  <React.Fragment>
                    {currPet?.id === item.id && <CircleCheck />}
                  </React.Fragment>
                </Row>
              </Card.Content>
            </Card>
          ))}
        </React.Fragment>
      </Column>
    </MainLayout>
  );
};

export default ChoosePetScreen;
