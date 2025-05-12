import Button from "@/components/button";
import Column from "@/components/column";
import InputField from "@/components/form/input";
import UploadField from "@/components/form/upload";
import useEvent, { Moment } from "@/hooks/useEventManager";
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
  photo: z.string({ message: "Please upload at least one photo" }),
});

const MomentFormScreen = () => {
  const currPet = usePetStore((state) => state.currPet);
  const { addMoment } = useEvent();
  const form = useForm<Moment>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = (values: Moment) => {
    addMoment(currPet.id, values).then(() => {
      toast("Save Successful");
      router.back();
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
        {/* <InputField
          name="notes"
          label="description"
          control={form.control}
          placeholder="Please enter notes (optional)"
        /> */}
        <UploadField
          label="Capture Moment"
          name="photo"
          control={form.control}
          bucket="moments"
        />
        <Button mode="contained" onPress={form.handleSubmit(handleSubmit)}>
          Submit
        </Button>
      </Column>
    </MainLayout>
  );
};

export default MomentFormScreen;
