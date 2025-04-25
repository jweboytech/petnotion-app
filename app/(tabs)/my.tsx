// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";
// import Auth from "@/components/auth";
// import Account from "@/components/account";
// import { View } from "react-native";
// import { Session } from "@supabase/supabase-js";

// export default function App() {
//   const [session, setSession] = useState<Session | null>(null);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//   }, []);

//   return (
//     <View>
//       {session && session.user ? (
//         <Account key={session.user.id} session={session} />
//       ) : (
//         <Auth />
//       )}
//     </View>
//   );
// }

import Column from "@/components/column";
import Row from "@/components/row";
import MainLayout from "@/layout/main";
import { useUserStore } from "@/store/user";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";

const MyScreen = () => {
  const avatar = useUserStore((state) => state.avatar);
  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);

  return (
    <MainLayout>
      <Row gap={8} alignItems="center">
        <Image style={styles.avatar} source={{ uri: avatar }} />
        <Column>
          <Text>{name}</Text>
          <Text>{email}</Text>
        </Column>
      </Row>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 56,
    height: 56,
    borderRadius: "50%",
  },
});

export default MyScreen;
