import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/customButton";

const DecisionHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>It's Decision Time</Text>
        <Text style={styles.subtitle}>Tap below when you're ready to choose where to eat.</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("WhosGoing")}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Start decision"
        >
          <View style={styles.iconCircle}>
            <Ionicons name="restaurant" size={48} color="#fff" />
          </View>
        </TouchableOpacity>
        <CustomButton text="Who's Going?" onPress={() => navigation.navigate("WhosGoing")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    padding: 16,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  iconButton: {
    marginBottom: 16,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#ff0000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
});

export default DecisionHomeScreen;
