import { View, Text, StyleSheet } from "react-native";

export default function Chat() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Page</Text>
      <Text style={styles.subtitle}>One-on-one messaging</Text>
      <Text style={styles.description}>
        Auto-created chats when train requests are accepted, mutual follows +
        initiation, or direct messages
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
