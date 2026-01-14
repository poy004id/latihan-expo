import { useAuth } from "@/contexts/AuthContext";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const NavGuard = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated) {
      router.replace("/(tabs)");
    } else {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, loading]);

  // 🔒 block render sampai auth state siap
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ❗Slot hanya dirender setelah guard selesai
  return <Slot />;
};

export default NavGuard;
