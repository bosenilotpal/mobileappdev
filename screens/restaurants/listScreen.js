import React, { useCallback, useState } from "react";
import { View, FlatList, Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/customButton";

const ListScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchRestaurants = async () => {
        try {
          const data = await AsyncStorage.getItem("restaurants");
          setRestaurants(data ? JSON.parse(data) : []);
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Load failed",
            text2: "Could not load restaurants",
          });
        }
      };

      fetchRestaurants();
    }, [])
  );

  const deleteRestaurant = async (id) => {
    Alert.alert("Delete", "Delete this restaurant?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            const updated = restaurants.filter((restaurant) => restaurant.key !== id);
            await AsyncStorage.setItem("restaurants", JSON.stringify(updated));
            setRestaurants(updated);
            Toast.show({
              type: "success",
              text1: "Deleted",
              text2: "Restaurant removed",
            });
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Delete failed",
              text2: "Try again",
            });
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <CustomButton text="Add Restaurant" onPress={() => navigation.navigate("RestaurantsAdd")} />
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.emptyText}>No restaurants yet.</Text>}
          renderItem={({ item }) => (
            <View style={styles.restaurantItem}>
              <Text style={styles.text}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => deleteRestaurant(item.key)}
                style={styles.deleteIconButton}
                accessibilityRole="button"
                accessibilityLabel={`Delete ${item.name}`}
              >
                <Ionicons name="trash-outline" size={22} color="#c62828" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f4f7" },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  listContent: { paddingTop: 8 },
  restaurantItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  text: { fontSize: 18, flex: 1, marginRight: 12 },
  emptyText: { marginTop: 20, textAlign: "center", color: "#666" },
  deleteIconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff5f5",
    borderWidth: 1,
    borderColor: "#ffd5d5",
  },
});

export default ListScreen;
