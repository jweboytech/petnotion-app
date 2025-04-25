import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/user";
import { User } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const setUser = useUserStore((state) => state.setUser);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        const { user, access_token, expires_at } = data.session;
        // 当前时间（秒）
        const current = Math.floor(Date.now() / 1000);

        // 检查 token是否过期
        if (expires_at && current >= expires_at) {
          // token 过期就 refresh
          console.log("🔄 Token expired, refreshing...");
        } else {
          // token 还有效，直接使用当前 session
          const payload: User = {
            avatar: user.user_metadata.avatar_url,
            email: user.user_metadata.email,
            name: user.user_metadata.name,
            token: access_token,
            id: user.id,
          };
          setUser(payload);
        }
      }
    });
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "My",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
