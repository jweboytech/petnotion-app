import { supabase } from "@/lib/supabase";
import { getUserData } from "@/utils/supabase";
import React from "react";

const useEventManager = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [events, setEvents] = React.useState<PetEvent[]>([]);
  const [userEvents, setUserEvents] = React.useState<PetEvent[]>([]);

  const addEvent = async (payload: Event & Pick<Pet, "id">) => {
    //
    const { data, error } = await supabase.from("pet_events").insert(payload);
    console.log(data, error);
  };

  const getUserEvents = async () => {
    try {
      setIsLoading(true);
      const user = await getUserData();
      const { data, error } = await supabase
        .from("pet_events")
        .select()
        .eq("user_id", user?.id);

      setUserEvents(data as PetEvent[]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
    addEvent,
    events,
    getAllEvents,
    userEvents,
    getUserEvents,
  };
};

export default useEventManager;
