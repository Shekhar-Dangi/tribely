import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Feed</Text>
      <Text style={styles.subtitle}>
        Default page after login - Infinite scroll feed
      </Text>
      <Text style={styles.description}>
        Posts from users they follow or algorithmic suggestions
      </Text>
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
    color: "#999",
  },
});
