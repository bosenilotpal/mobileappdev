import React, { useCallback, useState } from "react";
import { View, FlatList, Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/customButton";

const ListScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchPeople = async () => {
        try {
          const data = await AsyncStorage.getItem("people");
          setPeople(data ? JSON.parse(data) : []);
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Load failed",
            text2: "Could not load people",
          });
        }
      };

      fetchPeople();
    }, [])
  );

  const deletePerson = async (id) => {
    Alert.alert("Delete", "Delete this person?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            const updated = people.filter((person) => person.key !== id);
            await AsyncStorage.setItem("people", JSON.stringify(updated));
            setPeople(updated);
            Toast.show({
              type: "success",
              text1: "Deleted",
              text2: "Person removed",
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
        <CustomButton text="Add Person" onPress={() => navigation.navigate("PeopleAdd")} />
        <FlatList
          data={people}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.emptyText}>No people yet.</Text>}
          renderItem={({ item }) => (
            <View style={styles.personItem}>
              <View style={styles.personTextContainer}>
                <Text style={styles.text}>{`${item.firstname} ${item.lastname}`}</Text>
                <Text style={styles.subText}>{item.relationship}</Text>
              </View>
              <TouchableOpacity
                onPress={() => deletePerson(item.key)}
                style={styles.deleteIconButton}
                accessibilityRole="button"
                accessibilityLabel={`Delete ${item.firstname} ${item.lastname}`}
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
  personItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  personTextContainer: { flex: 1, marginRight: 12 },
  text: { fontSize: 18 },
  subText: { color: "#666", marginTop: 2 },
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
