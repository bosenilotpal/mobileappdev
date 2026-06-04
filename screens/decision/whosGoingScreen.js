import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/customButton";
import { formatPersonName } from "./decisionLogic";

const WhosGoingScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadPeople = async () => {
        try {
          const data = await AsyncStorage.getItem("people");
          setPeople(data ? JSON.parse(data) : []);
        } catch (error) {
          Toast.show({ type: "error", text1: "Could not load people" });
        }
      };
      loadPeople();
      setSelectedKeys([]);
    }, [])
  );

  const togglePerson = (key) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleNext = () => {
    if (selectedKeys.length === 0) {
      Toast.show({ type: "error", text1: "Select at least one person" });
      return;
    }

    const selectedPeople = people.filter((person) => selectedKeys.includes(person.key));
    navigation.navigate("Choice", { selectedPeople });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Who's Going?</Text>
        <Text style={styles.subtitle}>Select everyone joining this meal.</Text>

        <FlatList
          data={people}
          keyExtractor={(item) => item.key}
          style={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>Add people first on the People tab.</Text>}
          renderItem={({ item }) => {
            const selected = selectedKeys.includes(item.key);
            return (
              <TouchableOpacity style={styles.row} onPress={() => togglePerson(item.key)}>
                <View style={styles.rowText}>
                  <Text style={styles.name}>{formatPersonName(item)}</Text>
                  <Text style={styles.relationship}>{item.relationship}</Text>
                </View>
                <Ionicons
                  name={selected ? "checkbox" : "square-outline"}
                  size={24}
                  color={selected ? "#007bff" : "#999"}
                />
              </TouchableOpacity>
            );
          }}
        />

        <CustomButton text="Next" onPress={handleNext} disabled={selectedKeys.length === 0} />
        <CustomButton
          text="Back"
          onPress={() => navigation.goBack()}
          buttonStyle={styles.backButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f4f7", padding: 16 },
  card: {
    flex: 1,
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
  list: { flex: 1, marginBottom: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  rowText: { flex: 1, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "600" },
  relationship: { color: "#666", marginTop: 2 },
  emptyText: { textAlign: "center", color: "#666", marginTop: 24 },
  backButton: { backgroundColor: "#6b7280", marginTop: 8 },
});

export default WhosGoingScreen;
