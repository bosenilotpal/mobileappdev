import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/customButton";
import CustomPickerField from "../../components/customPickerField";
import { emptyFilters, filterRestaurants, pickRandomRestaurant } from "./decisionLogic";

const ChoiceScreen = ({ navigation, route }) => {
  const { selectedPeople } = route.params;
  const [restaurants, setRestaurants] = useState([]);
  const [filters, setFilters] = useState(emptyFilters());

  useFocusEffect(
    useCallback(() => {
      const loadRestaurants = async () => {
        try {
          const data = await AsyncStorage.getItem("restaurants");
          setRestaurants(data ? JSON.parse(data) : []);
        } catch (error) {
          Toast.show({ type: "error", text1: "Could not load restaurants" });
        }
      };
      loadRestaurants();
    }, [])
  );

  const setFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleChoose = () => {
    const filtered = filterRestaurants(restaurants, filters);

    if (filtered.length === 0) {
      Toast.show({
        type: "error",
        text1: "No restaurants match",
        text2: "Adjust filters or add more restaurants",
      });
      return;
    }

    const chosen = pickRandomRestaurant(filtered);
    navigation.navigate("Result", {
      selectedPeople,
      filters,
      filteredRestaurants: filtered,
      currentRestaurant: chosen,
      vetoedByPersonKeys: [],
      rejectedRestaurantKeys: [],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Narrow the Choices</Text>
          <Text style={styles.subtitle}>Optional filters before a random pick.</Text>

          <CustomPickerField
            label="Cuisine"
            selectedValue={filters.cuisine}
            onValueChange={(value) => setFilter("cuisine", value)}
          >
            <Picker.Item label="Any" value="" />
            <Picker.Item label="American" value="American" />
            <Picker.Item label="Chinese" value="Chinese" />
            <Picker.Item label="Italian" value="Italian" />
            <Picker.Item label="Mexican" value="Mexican" />
            <Picker.Item label="Other" value="Other" />
          </CustomPickerField>

          <CustomPickerField
            label="Minimum Rating"
            selectedValue={filters.minRating}
            onValueChange={(value) => setFilter("minRating", value)}
          >
            <Picker.Item label="Any" value="" />
            <Picker.Item label="1+" value="1" />
            <Picker.Item label="2+" value="2" />
            <Picker.Item label="3+" value="3" />
            <Picker.Item label="4+" value="4" />
            <Picker.Item label="5" value="5" />
          </CustomPickerField>

          <CustomPickerField
            label="Maximum Price"
            selectedValue={filters.maxPrice}
            onValueChange={(value) => setFilter("maxPrice", value)}
          >
            <Picker.Item label="Any" value="" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </CustomPickerField>

          <CustomPickerField
            label="Delivery"
            selectedValue={filters.delivery}
            onValueChange={(value) => setFilter("delivery", value)}
          >
            <Picker.Item label="Any" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </CustomPickerField>

          <CustomButton text="Randomly Choose" onPress={handleChoose} buttonStyle={styles.chooseButton} />
          <CustomButton
            text="Back"
            onPress={() => navigation.goBack()}
            buttonStyle={styles.backButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  container: { flex: 1, backgroundColor: "#f2f4f7", padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 12 },
  chooseButton: { backgroundColor: "#28a745" },
  backButton: { backgroundColor: "#6b7280", marginTop: 8 },
});

export default ChoiceScreen;
