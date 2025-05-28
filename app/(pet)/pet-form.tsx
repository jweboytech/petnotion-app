import Button from "@/components/button";
import Column from "@/components/column";
import InputField from "@/components/form/input";
import UploadField from "@/components/form/upload";
import MainLayout from "@/layout/main";
import { supabase } from "@/lib/supabase";
import { toast } from "@/utils";
import { checkIsAuthedUser } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { z } from "zod";

const schema = z.object({
  name: z.string({ message: "Please enter name" }),
  photo: z.string({ message: "Please upload at least one photo" }),
});

const PetFormScreen = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    checkIsAuthedUser((userId) => {
      supabase
        .from("pets")
        .insert({ ...values, user_id: userId })
        .then((data) => {
          console.log(data);
          if (data.error?.message) {
            toast(data.error.message);
            return;
          }
          toast("Save Successful");
          router.back();
        });
    });
  };

  return (
    <MainLayout>
      <Text>PetFormScreen</Text>
      <Column gap={16}>
        <InputField
          name="name"
          control={form.control}
          placeholder="Please enter name"
        />
        <UploadField name="photo" control={form.control} />
        <Button mode="contained" onPress={form.handleSubmit(handleSubmit)}>
          Submit
        </Button>
      </Column>
    </MainLayout>
  );
};

export default PetFormScreen;
