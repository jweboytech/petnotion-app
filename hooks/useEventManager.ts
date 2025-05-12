import { supabase } from "@/lib/supabase";
import { toast } from "@/utils";
import { getUserData } from "@/utils/supabase";
import React from "react";

export interface Moment {
  title: string;
  photo: string;
}

const useEventManager = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [events, setEvents] = React.useState<PetMoment[]>([]);
  const [petMoments, setPetMoments] = React.useState<PetMoment[]>([]);

  const addMoment = async (petId: string, payload: Moment) => {
    try {
      setIsLoading(true);
      const user = await getUserData();
      if (user != null) {
        const { data, error } = await supabase
          .from("pet_events")
          .insert({
            title: payload.title,
            pet_id: petId,
            user_id: user.id,
          })
          .select()
          .single();

        if (error) throw error;

        if (data != null) {
          const { error } = await supabase.from("pet_event_photos").insert([
            {
              event_id: data.id,
              photo_url: payload.photo,
              is_cover: true,
            },
          ]);
          setIsLoading(false);
          if (error) throw error;
        } else {
          setIsLoading(false);
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      toast(error.message);
    }
  };

  const getPetMomentsByUser = async () => {
    try {
      setIsLoading(true);
      const user = await getUserData();
      const { data, error } = await supabase
        .from("pet_events")
        .select(
          `
            id,
            title,
            created_at,
            pet_event_photos (
              id,
              photo_url
            )
          `
        )
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPetMoments(data as PetMoment[]);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast(error.message);
    }
  };

  const getAllEvents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("pet_events").select();
      setEvents(data as PetEvent[]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    addMoment,
    petMoments,
    getPetMomentsByUser,
    events,
    getAllEvents,
  };
};

export default useEventManager;
