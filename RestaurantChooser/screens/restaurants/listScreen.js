import React, { useCallback, useState } from "react";
import { View, FlatList, Alert, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
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
      <CustomButton text="Add Restaurant" onPress={() => navigation.navigate("RestaurantsAdd")} />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.key}
        ListEmptyComponent={<Text style={styles.emptyText}>No restaurants yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.restaurantItem}>
            <Text style={styles.text}>{item.name}</Text>
            <CustomButton
              text="Delete"
              onPress={() => deleteRestaurant(item.key)}
              buttonStyle={styles.deleteButton}
              width="35%"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  restaurantItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  text: { fontSize: 18, flex: 1, marginRight: 12 },
  emptyText: { marginTop: 20, textAlign: "center", color: "#666" },
  deleteButton: { backgroundColor: "#c62828" },
});

export default ListScreen;
