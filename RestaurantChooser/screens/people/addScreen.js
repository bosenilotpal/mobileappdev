import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
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
    <ScrollView>
      <View style={styles.addScreenInnerContainer}>
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
          <View style={styles.pickerContainer}>
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
            width="44%"
          />
          <CustomButton text="Save" onPress={savePerson} buttonStyle={styles.saveButton} width="44%" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addScreenInnerContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
    paddingBottom: 20,
  },
  addScreenFormContainer: { width: "96%" },
  fieldLabel: { marginLeft: 10, marginBottom: 4 },
  pickerContainer: {
    ...Platform.select({
      ios: {},
      android: {
        width: "96%",
        borderRadius: 8,
        borderColor: "#c0c0c0",
        borderWidth: 2,
        marginLeft: 10,
        marginBottom: 8,
      },
    }),
  },
  picker: {
    ...Platform.select({
      ios: {
        width: "96%",
        borderRadius: 8,
        borderColor: "#c0c0c0",
        borderWidth: 2,
        marginLeft: 10,
        marginBottom: 8,
      },
      android: {},
    }),
  },
  errorText: { color: "red", marginLeft: 10, marginBottom: 8 },
  addScreenButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    width: "96%",
  },
  cancelButton: { backgroundColor: "gray" },
  saveButton: { backgroundColor: "green" },
});

export default AddScreen;
