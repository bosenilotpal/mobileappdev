import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/customButton";
import {
  allHaveVetoed,
  formatPersonName,
  getRemainingVetoers,
  pickRandomRestaurant,
} from "./decisionLogic";

const ResultScreen = ({ navigation, route }) => {
  const {
    selectedPeople,
    filteredRestaurants,
    currentRestaurant,
    vetoedByPersonKeys,
    rejectedRestaurantKeys,
  } = route.params;

  const [vetoModalVisible, setVetoModalVisible] = useState(false);

  const goToFinal = (restaurant, forced = false) => {
    navigation.replace("Final", {
      restaurant,
      selectedPeople,
      forced,
    });
  };

  const handleAccept = () => {
    goToFinal(currentRestaurant);
  };

  const handleVetoPress = () => {
    const remaining = getRemainingVetoers(selectedPeople, vetoedByPersonKeys);
    if (remaining.length === 0) {
      Toast.show({ type: "info", text1: "Everyone has already vetoed" });
      return;
    }
    setVetoModalVisible(true);
  };

  const handleVetoByPerson = (personKey) => {
    setVetoModalVisible(false);

    const newVetoedKeys = [...vetoedByPersonKeys, personKey];
    const newRejectedKeys = [...rejectedRestaurantKeys, currentRestaurant.key];
    const nextRestaurant = pickRandomRestaurant(filteredRestaurants, newRejectedKeys);

    if (!nextRestaurant) {
      Toast.show({
        type: "info",
        text1: "No other matches",
        text2: "Keeping the current choice",
      });
      goToFinal(currentRestaurant, true);
      return;
    }

    if (allHaveVetoed(selectedPeople, newVetoedKeys)) {
      goToFinal(nextRestaurant, true);
      return;
    }

    navigation.replace("Result", {
      selectedPeople,
      filteredRestaurants,
      currentRestaurant: nextRestaurant,
      vetoedByPersonKeys: newVetoedKeys,
      rejectedRestaurantKeys: newRejectedKeys,
    });
  };

  const remainingVetoers = getRemainingVetoers(selectedPeople, vetoedByPersonKeys);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>The App Chooses...</Text>
          <Text style={styles.restaurantName}>{currentRestaurant.name}</Text>

          <View style={styles.details}>
            <Text style={styles.detailRow}>Cuisine: {currentRestaurant.cuisine}</Text>
            <Text style={styles.detailRow}>Rating: {currentRestaurant.rating}</Text>
            <Text style={styles.detailRow}>Price: {currentRestaurant.price}</Text>
            <Text style={styles.detailRow}>Phone: {currentRestaurant.phone}</Text>
            <Text style={styles.detailRow}>Address: {currentRestaurant.address}</Text>
            <Text style={styles.detailRow}>Delivery: {currentRestaurant.delivery}</Text>
          </View>

          <Text style={styles.vetoInfo}>
            Vetoes used: {vetoedByPersonKeys.length} / {selectedPeople.length}
          </Text>

          <View style={styles.buttonRow}>
            <CustomButton text="Accept" onPress={handleAccept} buttonStyle={styles.acceptButton} width="47%" />
            <CustomButton
              text="Veto"
              onPress={handleVetoPress}
              buttonStyle={styles.vetoButton}
              width="47%"
              disabled={remainingVetoers.length === 0}
            />
          </View>
        </View>
      </View>

      <Modal visible={vetoModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Who is vetoing?</Text>
            <FlatList
              data={remainingVetoers}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalRow} onPress={() => handleVetoByPerson(item.key)}>
                  <Text style={styles.modalName}>{formatPersonName(item)}</Text>
                </TouchableOpacity>
              )}
            />
            <CustomButton
              text="Cancel"
              onPress={() => setVetoModalVisible(false)}
              buttonStyle={styles.cancelButton}
            />
          </View>
        </View>
      </Modal>
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
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  restaurantName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
    marginBottom: 16,
  },
  details: { marginBottom: 16 },
  detailRow: { fontSize: 14, color: "#444", marginBottom: 4 },
  vetoInfo: { fontSize: 13, color: "#666", textAlign: "center", marginBottom: 16 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  acceptButton: { backgroundColor: "#28a745" },
  vetoButton: { backgroundColor: "#c62828" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    maxHeight: "70%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  modalRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  modalName: { fontSize: 16 },
  cancelButton: { backgroundColor: "#6b7280", marginTop: 12 },
});

export default ResultScreen;
