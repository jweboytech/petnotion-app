import { supabase } from "@/lib/supabase";
import { toast } from "@/utils";
import { checkIsAuthedUser, getUserData } from "@/utils/supabase";
import React from "react";

export const usePetManager = () => {
  const [currPet, setCurrPet] = React.useState<Pet>();
  const [allPets, setAllPets] = React.useState<Pet[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const setCurrPetData = async (petId: string) => {
    try {
      setIsLoading(true);
      const user = await getUserData();
      const { error } = await supabase
        .from("user_pet_settings")
        .upsert(
          { user_id: user!.id, pet_id: petId },
          { onConflict: "user_id" }
        );

      if (error) throw error;

      setIsLoading(false);
    } catch (error: any) {
      toast(error.message);
      setIsLoading(false);
    }
  };

  const getCurrPet = async () => {
    try {
      setIsLoading(true);
      const user = await getUserData();
      const { data, error } = await supabase
        .from("user_pet_settings")
        .select()
        .eq("user_id", user!.id)
        .single();

      if (error) throw error;

      const { data: pet, error: error1 } = await supabase
        .from("pets")
        .select()
        .eq("id", data.pet_id)
        .single();

      if (error1) throw error1;

      setIsLoading(false);
      setCurrPet(pet);
      return pet;
    } catch (error: any) {
      toast(error.message);
      setIsLoading(false);
    }
  };

  const getAllPets = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("pets")
        .select()
        // 创建时间倒序
        .order("created_at", { ascending: false });

      if (error) throw error;

      setIsLoading(false);
      setAllPets(data);
    } catch (error: any) {
      setIsLoading(false);
      toast(error.message);
    }
  };

  return {
    getCurrPet,
    currPet,
    getAllPets,
    allPets,
    isLoading,
    setCurrPetData,
  };
};
