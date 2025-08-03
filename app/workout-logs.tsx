import { View, Text, StyleSheet } from "react-native";

export default function WorkoutLogs() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Logs</Text>
      <Text style={styles.subtitle}>Timeline of workout history</Text>
      <Text style={styles.description}>
        Voice workout logging with credits system (5 credits per minute)
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
