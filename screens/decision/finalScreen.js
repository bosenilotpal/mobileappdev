import React from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import CustomButton from "../../components/customButton";
import { formatPersonName } from "./decisionLogic";

const FinalScreen = ({ navigation, route }) => {
  const { restaurant, selectedPeople, forced = false } = route.params;

  const openWebsite = () => {
    if (!restaurant.website) return;
    const url = restaurant.website.startsWith("http")
      ? restaurant.website
      : `https://${restaurant.website}`;
    Linking.openURL(url).catch(() => {});
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Decision Made!</Text>
          {forced ? (
            <Text style={styles.forcedText}>
              Everyone used their veto — this is the final choice.
            </Text>
          ) : (
            <Text style={styles.subtitle}>Enjoy your meal together.</Text>
          )}

          <Text style={styles.restaurantName}>{restaurant.name}</Text>

          <View style={styles.details}>
            <Text style={styles.detailRow}>Cuisine: {restaurant.cuisine}</Text>
            <Text style={styles.detailRow}>Rating: {restaurant.rating} stars</Text>
            <Text style={styles.detailRow}>Price level: {restaurant.price}</Text>
            <Text style={styles.detailRow}>Phone: {restaurant.phone}</Text>
            <Text style={styles.detailRow}>Address: {restaurant.address}</Text>
            <Text style={styles.detailRow}>Delivery: {restaurant.delivery}</Text>
            {restaurant.website ? (
              <Text style={styles.link} onPress={openWebsite}>
                Website: {restaurant.website}
              </Text>
            ) : null}
          </View>

          <Text style={styles.groupTitle}>Dining with:</Text>
          {selectedPeople.map((person) => (
            <Text key={person.key} style={styles.personRow}>
              • {formatPersonName(person)} ({person.relationship})
            </Text>
          ))}

          <CustomButton
            text="Start New Decision"
            onPress={() => navigation.popToTop()}
            buttonStyle={styles.startButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  container: { flex: 1, backgroundColor: "#f2f4f7", padding: 16, justifyContent: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 12 },
  forcedText: {
    fontSize: 14,
    color: "#c62828",
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "600",
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#28a745",
    textAlign: "center",
    marginBottom: 16,
  },
  details: { marginBottom: 16 },
  detailRow: { fontSize: 14, color: "#444", marginBottom: 4 },
  link: { fontSize: 14, color: "#007bff", marginTop: 4 },
  groupTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  personRow: { fontSize: 14, color: "#444", marginBottom: 2 },
  startButton: { marginTop: 20, backgroundColor: "#007bff" },
});

export default FinalScreen;
