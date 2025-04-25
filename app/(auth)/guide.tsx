import Button from "@/components/button";
import InputField from "@/components/form/input";
import PasswordInputField from "@/components/form/password";
import MainLayout from "@/layout/main";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Platform, Text, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import { supabase } from "@/lib/supabase";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { toast } from "@/utils";

const GuideScreen = () => {
  const handleGoogleLogin = async () => {
    try {
      // 生成自定义的 redirectUrl
      const redirectUrl = Linking.createURL("oauth-callback");

      const { error, data } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl, // 指定回调地址
          skipBrowserRedirect: true, // 禁止自动跳转浏览器
        },
      });

      if (error) throw error;

      if (data?.url) {
        // 打开浏览器登录页面
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUrl,
          {
            // iOS关键配置
            preferEphemeralSession: Platform.OS === "ios",
          }
        );

        console.log("OAuth Result:", result);

        if (result.type === "success") {
          // 解析Token
          const hashParams = new URLSearchParams(result.url.split("#")[1]);
          const access_token = hashParams.get("access_token");
          const refresh_token = hashParams.get("refresh_token");

          if (access_token && refresh_token) {
            await supabase.auth.setSession({ access_token, refresh_token });
            toast("Login Successfu ~");
            setTimeout(() => {
              router.replace("/home");
            }, 300);
          }
        }
      }
    } catch (error) {
      // console.log("error", error);
      Alert.alert("Login failed, please try again later");
    }
  };

  React.useEffect(() => {
    // const {
    //   data: { subscription },
    // } = supabase.auth.onAuthStateChange(async (event, session) => {
    //   console.log(event, session);
    // });
    // return () => subscription.unsubscribe();

    const subscription = Linking.addEventListener("url", ({ url }) => {
      if (url.includes("oauth-callback")) {
        console.log("Received callback URL:", url);
        // WebBrowser.maybeCompleteAuthSession(); // 关键：完成认证流程
        // WebBrowser.dismissBrowser(); // 关闭浏览器
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <MainLayout>
      <Text style={{ paddingVertical: 80 }}>
        插画图插画图插画图插画图插画图插画图插画图
        插画图插画图插画图插画图插画图插画图插画图
        插画图插画图插画图插画图插画图插画图插画图
        插画图插画图插画图插画图插画图插画图插画图
      </Text>
      <View style={{ gap: 24, marginTop: 40 }}>
        {/* <Button
          icon="google"
          mode="outlined"
          onPress={() => console.log("Pressed")}
        >
          Continute with Google
        </Button> */}
        <Button icon="google" mode="contained" onPress={handleGoogleLogin}>
          Continute with Google
        </Button>
        {/* <Button href="/signin" icon="email" mode="contained">
          Continute with Email
        </Button> */}
      </View>
    </MainLayout>
  );
};

export default GuideScreen;
