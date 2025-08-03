import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { useClerk, useUser } from "@clerk/clerk-expo";

export default function Profile() {
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>{user ? user.fullName : "Name"}</Text>
      <Text style={styles.description}>
        Stats, experiences, certifications, posts, and data
      </Text>

      <View style={styles.buttonContainer}>
        <Link href="/chat" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/workout-logs" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Workout Logs</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/leaderboard" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Leaderboard</Text>
          </TouchableOpacity>
        </Link>

        {/* <Link href="/settings" asChild> */}
        <TouchableOpacity
          onPress={async () => {
            await signOut();
            router.replace("/");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        {/* </Link> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#666",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    color: "#999",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "#00d4ff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
