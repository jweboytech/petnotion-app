import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { toast } from ".";

export const getUserData = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export const checkIsAuthedUser = async (callback: (param: string) => void) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user) {
  //   router.replace("/(auth)/signin");
  //   return;
  // }

  callback(user?.id);
};

export const insertData = async <T>(table: string, values: T) => {
  try {
    const { data, error } = await supabase.from(table).insert(values);

    if (error) {
      toast(error.message);
      throw error.message;
    }

    return data;
  } catch (error: any) {
    toast(`Insert Error: ${error.message}`);
    return null;
  }
};

export const fetchData = async <T>(table: string) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select()
      // 创建时间倒序
      .order("created_at", { ascending: false });

    if (error) {
      toast(error.message);
      throw error.message;
    }

    return data as T[];
  } catch (error: any) {
    toast(`Select Error: ${error.message}`);
    return [];
  }
};

export const fetchDataById = async <T>(
  table: string,
  field: string,
  userId: string
) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(field)
      .eq("user_id", userId)
      .single();

    if (error) {
      toast(error.message);
      throw error.message;
    }

    return data;
  } catch (error: any) {
    toast(`Select Error: ${error.message}`);
    return [];
  }
};
