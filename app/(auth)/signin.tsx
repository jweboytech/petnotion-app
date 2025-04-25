import Button from "@/components/button";
import InputField from "@/components/form/input";
import PasswordInputField from "@/components/form/password";
import MainLayout from "@/layout/main";
import { supabase } from "@/lib/supabase";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-root-toast";

const schema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
});
1;
const Auth = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function signInWithEmail(values: z.infer<typeof schema>) {
    console.log("values", values);
    Toast.show("This is a message", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
    // setLoading(true);
    // const { error } = await supabase.auth.signInWithPassword({
    //   email: values.email,
    //   password: values.password,
    // });
    // if (error) Alert.alert(error.message);
    // setLoading(false);
  }

  return (
    <MainLayout>
      <Text>
        插画图插画图插画图插画图插画图插画图插画图
        插画图插画图插画图插画图插画图插画图插画图
        插画图插画图插画图插画图插画图插画图插画图
        插画图插画图插画图插画图插画图插画图插画图
      </Text>
      <View style={{ gap: 24, marginTop: 40 }}>
        <InputField
          label="Username"
          control={form.control}
          name="email"
          secureTextEntry
        />
        <PasswordInputField
          label="Password"
          control={form.control}
          name="password"
        />
        <Button
          isDisabled
          mode="contained"
          onPress={form.handleSubmit(signInWithEmail)}
        >
          Sign in
        </Button>
      </View>
    </MainLayout>
  );
};

export default Auth;
