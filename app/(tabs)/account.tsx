import { useAuth } from "@/contexts/AuthContext";
import ChildComponent from "@/screens/account/ChildComponent";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, List, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const account = () => {
  const { colors } = useTheme();
  const styles = customStyles(colors);
  const router = useRouter();

    const auth = useAuth() as any;
    console.log("Auth in account page:", auth);
    const logout = auth?.logout;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={{ flex: 1, padding: 16 }}>
        <List.Section>
          <List.Item
            left={() => <List.Icon icon="account-circle" />}
            titleStyle={styles.listTitle}
            title="Profile"
            description="View and edit your profile"
            descriptionStyle={styles.listDescription}
          />
          <List.Item
            left={() => <List.Icon icon="cogs" />}
            title="Settings"
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
            description="Manage your account settings"
          />
          <List.Item
            left={() => <List.Icon icon="lock" />}
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
            title="Logout"
            description="Sign out of your account"
          />
          </List.Section>
        <Button
          mode="contained"
          onPress={() => {
            logout?.();
          }}
          style={{ marginTop: 20 }}
        >
          Logout
        </Button>
        <ChildComponent title="Logout from Child Component" />
      </View>
    </SafeAreaView>
  )
}

export default account;

const customStyles = (colors: any) =>
  StyleSheet.create({
    listDescription: {
      color: colors.error,
      fontWeight: "400",
      fontSize: 13,
    },
    listTitle: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "bold",
    },
  });


