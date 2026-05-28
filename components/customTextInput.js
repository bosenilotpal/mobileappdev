import React from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomTextInput = ({
  label,
  labelStyle,
  maxLength,
  textInputStyle,
  stateHolder,
  stateFieldName,
  value,
  onChangeText,
  error,
  ...rest
}) => {
  const resolvedValue =
    value !== undefined
      ? value
      : stateHolder && stateFieldName
        ? stateHolder[stateFieldName] || ""
        : "";

  const resolvedOnChange =
    onChangeText ||
    ((text) => {
      if (stateHolder && stateFieldName && typeof stateHolder.setState === "function") {
        stateHolder.setState({ [stateFieldName]: text });
      }
    });

  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        maxLength={maxLength}
        style={[styles.input, textInputStyle, error ? styles.inputError : null]}
        value={resolvedValue}
        onChangeText={resolvedOnChange}
        {...rest}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

CustomTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
  maxLength: PropTypes.number,
  textInputStyle: PropTypes.object,
  stateHolder: PropTypes.object,
  stateFieldName: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  error: PropTypes.string,
};

const styles = StyleSheet.create({
  container: { marginBottom: 12, width: "100%" },
  label: { marginBottom: 6, color: "#222", fontSize: 16 },
  input: {
    width: "100%",
    borderRadius: 8,
    borderColor: "#c0c0c0",
    borderWidth: 1.5,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 2,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 2,
  },
});

export default CustomTextInput;
