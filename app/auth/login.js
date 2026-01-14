import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    Button,
    Card,
    Text,
    TextInput
} from "react-native-paper";

export default function LoginScreen() {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("adminpassword");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const onLogin = async () => {
        try {
            if (!username || !password) {
                alert("Please enter username and password");
                return;
            }
            setLoading(true);
            await login(username, password);
        } catch (error) {
            console.log("Login error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="headlineSmall" style={styles.title}>
                        Login
                    </Text>

                    <TextInput
                        label="Username"
                        value={username}
                        onChangeText={setUsername}
                        mode="outlined"
                        autoCapitalize="none"
                        style={styles.input}
                    />

                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        mode="outlined"
                        secureTextEntry
                        style={styles.input}
                    />

                    <Button
                        mode="contained"
                        onPress={onLogin}
                        loading={loading}
                        disabled={loading}
                        style={styles.button}
                    >
                        Masuk
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    card: {
        borderRadius: 12,
    },
    title: {
        textAlign: "center",
        marginBottom: 24,
        fontWeight: "bold",
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
        paddingVertical: 4,
    },
});
