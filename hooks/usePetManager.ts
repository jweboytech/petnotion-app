import { supabase } from "@/lib/supabase";
import { toast } from "@/utils";
import { checkIsAuthedUser, getUserData } from "@/utils/supabase";
import React from "react";

export const usePetManager = () => {
  const [currPet, setCurrPet] = React.useState<Pet>();
  const [allPets, setAllPets] = React.useState<Pet[]>([]);

  //
  const getCurrPet = async () => {
    const user = await getUserData();
    const { data } = await supabase
      .from("user_pet_settings")
      .select()
      .eq("user_id", user!.id)
      .single();

    const { data: pet } = await supabase
      .from("pets")
      .select()
      .eq("id", data.pet_id)
      .single();

    setCurrPet(pet);
    return pet;
  };

  const getAllPets = async () => {
    try {
      const { data, error } = await supabase
        .from("pets")
        .select()
        // 创建时间倒序
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data as Pet[];
    } catch (error: any) {
      toast(error.message);
      return [];
    }
  };

  return {
    getCurrPet,
    currPet,
    getAllPets,
    allPets,
  };
};
