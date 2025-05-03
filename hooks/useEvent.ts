import { supabase } from "@/lib/supabase";
import React from "react";

const useEvent = () => {
  const [events, setEvent] = React.useState<Event[]>([]);

  const addEvent = async (payload: Event & Pick<Pet, "id">) => {
    //
    const { data, error } = await supabase.from("pet_events").insert(payload);
    console.log(data, error);
  };

  return {
    addEvent,
  };
};

export default useEvent;
