import { supabase } from "@/lib/supabase";
import { checkIsAuthedUser, getUserData } from "@/utils/supabase";
import React from "react";

export const usePetManager = () => {
  const [currPet, setCurrPet] = React.useState();
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

    return pet;
  };

  return {
    getCurrPet,
  };
};
