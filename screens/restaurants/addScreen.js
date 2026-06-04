import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/customButton";
import CustomTextInput from "../../components/customTextInput";
import CustomPickerField from "../../components/customPickerField";
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

          <CustomPickerField
            label="Cuisine"
            prompt="Cuisine"
            selectedValue={restaurant.cuisine}
            onValueChange={(value) => setField("cuisine", value)}
            error={restaurant.errors.cuisine}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="American" value="American" />
            <Picker.Item label="Chinese" value="Chinese" />
            <Picker.Item label="Italian" value="Italian" />
            <Picker.Item label="Mexican" value="Mexican" />
            <Picker.Item label="Other" value="Other" />
          </CustomPickerField>

          <CustomPickerField
            label="Price"
            selectedValue={restaurant.price}
            onValueChange={(value) => setField("price", value)}
            error={restaurant.errors.price}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </CustomPickerField>

          <CustomPickerField
            label="Rating"
            selectedValue={restaurant.rating}
            onValueChange={(value) => setField("rating", value)}
            error={restaurant.errors.rating}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </CustomPickerField>

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

          <CustomPickerField
            label="Delivery?"
            selectedValue={restaurant.delivery}
            onValueChange={(value) => setField("delivery", value)}
            error={restaurant.errors.delivery}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </CustomPickerField>
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
