import { View, Text, StyleSheet } from "react-native";

export default function Create() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create</Text>
      <Text style={styles.subtitle}>Upload new posts</Text>
      <Text style={styles.description}>
        3 categories: Text, Image, or Video posts
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
