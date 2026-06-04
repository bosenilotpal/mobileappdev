import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

const FIELD_HEIGHT = 36;

const CustomPickerField = ({
  label,
  selectedValue,
  onValueChange,
  error,
  prompt,
  children,
}) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.pickerContainer, error ? styles.pickerError : null]}>
        <Picker
          prompt={prompt}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor="#666"
        >
          {children}
        </Picker>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

CustomPickerField.propTypes = {
  label: PropTypes.string,
  selectedValue: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  prompt: PropTypes.string,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    marginBottom: 4,
    color: "#222",
    fontSize: 14,
  },
  pickerContainer: {
    width: "100%",
    height: FIELD_HEIGHT,
    minHeight: FIELD_HEIGHT,
    borderRadius: 6,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: FIELD_HEIGHT,
    color: "#222",
    ...Platform.select({
      ios: {
        marginVertical: -8,
      },
      web: {
        fontSize: 14,
        paddingHorizontal: 10,
        borderWidth: 0,
        backgroundColor: "transparent",
        outlineStyle: "none",
        lineHeight: FIELD_HEIGHT,
      },
      default: {},
    }),
  },
  pickerError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 2,
  },
});

export default CustomPickerField;
