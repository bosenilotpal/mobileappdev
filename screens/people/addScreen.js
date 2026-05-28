import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/customButton";
import CustomTextInput from "../../components/customTextInput";
import { validateFirstName, validateLastName } from "./validators";

const createInitialPerson = () => ({
  key: `p_${Date.now()}`,
  firstname: "",
  lastname: "",
  relationship: "",
  errors: {},
});

const AddScreen = ({ navigation }) => {
  const [person, setPerson] = useState(createInitialPerson());

  const setField = (field, value) => {
    setPerson((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: null },
    }));
  };

  const validateAllFields = () => {
    const errors = {
      firstname: validateFirstName(person.firstname),
      lastname: validateLastName(person.lastname),
      relationship: !person.relationship ? "Relationship is required" : null,
    };
    setPerson((prev) => ({ ...prev, errors }));
    return !Object.values(errors).some((error) => error !== null);
  };

  const savePerson = async () => {
    if (!validateAllFields()) {
      Toast.show({ type: "error", text1: "Please correct the highlighted fields" });
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem("people");
      const people = existingData ? JSON.parse(existingData) : [];
      const toSave = { ...person };
      delete toSave.errors;
      people.push(toSave);
      await AsyncStorage.setItem("people", JSON.stringify(people));
      Toast.show({ type: "success", text1: "Person added" });
      navigation.goBack();
    } catch (error) {
      Toast.show({ type: "error", text1: "Save failed", text2: "Please try again" });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      <View style={styles.addScreenInnerContainer}>
        <View style={styles.formCard}>
          <View style={styles.addScreenFormContainer}>
          <CustomTextInput
            label="First Name"
            maxLength={30}
            value={person.firstname}
            onChangeText={(text) => setField("firstname", text)}
            error={person.errors.firstname}
          />
          <CustomTextInput
            label="Last Name"
            maxLength={30}
            value={person.lastname}
            onChangeText={(text) => setField("lastname", text)}
            error={person.errors.lastname}
          />

          <Text style={styles.fieldLabel}>Relationship</Text>
          <View style={[styles.pickerContainer, person.errors.relationship ? styles.pickerError : null]}>
            <Picker
              selectedValue={person.relationship}
              onValueChange={(value) => setField("relationship", value)}
              style={styles.picker}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="Me" value="Me" />
              <Picker.Item label="Family" value="Family" />
              <Picker.Item label="Friend" value="Friend" />
              <Picker.Item label="Coworker" value="Coworker" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          {person.errors.relationship ? <Text style={styles.errorText}>{person.errors.relationship}</Text> : null}
          </View>

          <View style={styles.addScreenButtonsContainer}>
            <CustomButton
              text="Cancel"
              onPress={() => navigation.goBack()}
              buttonStyle={styles.cancelButton}
              width="47%"
            />
            <CustomButton text="Save" onPress={savePerson} buttonStyle={styles.saveButton} width="47%" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  addScreenInnerContainer: {
    flex: 1,
    padding: 16,
    width: "100%",
    backgroundColor: "#f2f4f7",
    justifyContent: "center",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  addScreenFormContainer: { width: "100%" },
  fieldLabel: { marginBottom: 6, color: "#222", fontSize: 16 },
  pickerContainer: {
    width: "100%",
    borderRadius: 8,
    borderColor: "#c0c0c0",
    borderWidth: 1.5,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  picker: {
    width: "100%",
  },
  pickerError: { borderColor: "red" },
  errorText: { color: "red", marginBottom: 8 },
  addScreenButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  cancelButton: { backgroundColor: "#6b7280" },
  saveButton: { backgroundColor: "green" },
});

export default AddScreen;
