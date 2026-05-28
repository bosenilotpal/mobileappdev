import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/customButton";
import CustomTextInput from "../../components/customTextInput";
import {
  validateName,
  validatePhone,
  validateAddress,
  validateWebsite,
} from "./validators";

const createInitialRestaurant = () => ({
  key: `r_${Date.now()}`,
  name: "",
  cuisine: "",
  price: "",
  rating: "",
  phone: "",
  address: "",
  website: "",
  delivery: "",
  errors: {},
});

const AddScreen = ({ navigation }) => {
  const [restaurant, setRestaurant] = useState(createInitialRestaurant());

  const setField = (field, value) => {
    setRestaurant((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: null },
    }));
  };

  const validateAllFields = () => {
    const errors = {
      name: validateName(restaurant.name),
      cuisine: !restaurant.cuisine ? "Cuisine is required" : null,
      price: !restaurant.price ? "Price is required" : null,
      rating: !restaurant.rating ? "Rating is required" : null,
      phone: validatePhone(restaurant.phone),
      address: validateAddress(restaurant.address),
      website: validateWebsite(restaurant.website),
      delivery: !restaurant.delivery ? "Delivery selection is required" : null,
    };

    setRestaurant((prev) => ({ ...prev, errors }));
    return !Object.values(errors).some((error) => error !== null);
  };

  const saveRestaurant = async () => {
    if (!validateAllFields()) {
      Toast.show({ type: "error", text1: "Please correct the highlighted fields" });
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem("restaurants");
      const restaurants = existingData ? JSON.parse(existingData) : [];
      const toSave = { ...restaurant };
      delete toSave.errors;
      restaurants.push(toSave);
      await AsyncStorage.setItem("restaurants", JSON.stringify(restaurants));
      Toast.show({ type: "success", text1: "Restaurant added" });
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
            label="Name"
            maxLength={50}
            value={restaurant.name}
            onChangeText={(text) => setField("name", text)}
            error={restaurant.errors.name}
          />

          <Text style={styles.fieldLabel}>Cuisine</Text>
          <View style={[styles.pickerContainer, restaurant.errors.cuisine ? styles.pickerError : null]}>
            <Picker
              prompt="Cuisine"
              selectedValue={restaurant.cuisine}
              onValueChange={(value) => setField("cuisine", value)}
              style={styles.picker}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="American" value="American" />
              <Picker.Item label="Chinese" value="Chinese" />
              <Picker.Item label="Italian" value="Italian" />
              <Picker.Item label="Mexican" value="Mexican" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          {restaurant.errors.cuisine ? <Text style={styles.errorText}>{restaurant.errors.cuisine}</Text> : null}

          <Text style={styles.fieldLabel}>Price</Text>
          <View style={[styles.pickerContainer, restaurant.errors.price ? styles.pickerError : null]}>
            <Picker
              selectedValue={restaurant.price}
              onValueChange={(value) => setField("price", value)}
              style={styles.picker}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
            </Picker>
          </View>
          {restaurant.errors.price ? <Text style={styles.errorText}>{restaurant.errors.price}</Text> : null}

          <Text style={styles.fieldLabel}>Rating</Text>
          <View style={[styles.pickerContainer, restaurant.errors.rating ? styles.pickerError : null]}>
            <Picker
              selectedValue={restaurant.rating}
              onValueChange={(value) => setField("rating", value)}
              style={styles.picker}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
            </Picker>
          </View>
          {restaurant.errors.rating ? <Text style={styles.errorText}>{restaurant.errors.rating}</Text> : null}

          <CustomTextInput
            label="Phone"
            maxLength={20}
            value={restaurant.phone}
            onChangeText={(text) => setField("phone", text)}
            error={restaurant.errors.phone}
            keyboardType="phone-pad"
          />
          <CustomTextInput
            label="Address"
            maxLength={50}
            value={restaurant.address}
            onChangeText={(text) => setField("address", text)}
            error={restaurant.errors.address}
          />
          <CustomTextInput
            label="Website"
            maxLength={50}
            value={restaurant.website}
            onChangeText={(text) => setField("website", text)}
            error={restaurant.errors.website}
            keyboardType="url"
            autoCapitalize="none"
          />

          <Text style={styles.fieldLabel}>Delivery?</Text>
          <View style={[styles.pickerContainer, restaurant.errors.delivery ? styles.pickerError : null]}>
            <Picker
              selectedValue={restaurant.delivery}
              onValueChange={(value) => setField("delivery", value)}
              style={styles.picker}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
          {restaurant.errors.delivery ? <Text style={styles.errorText}>{restaurant.errors.delivery}</Text> : null}
          </View>

          <View style={styles.addScreenButtonsContainer}>
            <CustomButton
              text="Cancel"
              onPress={() => navigation.goBack()}
              buttonStyle={styles.cancelButton}
              width="47%"
            />
            <CustomButton text="Save" onPress={saveRestaurant} buttonStyle={styles.saveButton} width="47%" />
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
