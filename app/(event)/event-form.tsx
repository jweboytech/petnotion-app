import Button from "@/components/button";
import Column from "@/components/column";
import InputField from "@/components/form/input";
import UploadField from "@/components/form/upload";
import useEvent from "@/hooks/useEventManager";
import MainLayout from "@/layout/main";
import { supabase } from "@/lib/supabase";
import { usePetStore } from "@/store/pet";
import { toast } from "@/utils";
import { checkIsAuthedUser } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string({ message: "Please enter title" }),
  description: z.string().optional(),
  photo: z.string({ message: "Please upload at least one photo" }).optional(),
});

const EventFormScreen = () => {
  const currPet = usePetStore((state) => state.currPet);
  const { addEvent } = useEvent();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  console.log(5, currPet);

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    checkIsAuthedUser((userId) => {
      addEvent({ ...values, user_id: userId, pet_id: currPet.id });
      //    toast(data.error.message);
      //   toast("Save Successful");
      //   router.back();
    });
  };

  return (
    <MainLayout>
      <Column gap={16}>
        <InputField
          name="title"
          label="Title"
          control={form.control}
          placeholder="Please enter title"
        />
        <InputField
          name="notes"
          label="description"
          control={form.control}
          placeholder="Please enter notes (optional)"
        />
        <UploadField name="photo" control={form.control} />
        <Button mode="contained" onPress={form.handleSubmit(handleSubmit)}>
          Submit
        </Button>
      </Column>
    </MainLayout>
  );
};

export default EventFormScreen;
