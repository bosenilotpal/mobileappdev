import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({
  text,
  onPress,
  buttonStyle,
  textStyle,
  width = "100%",
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? null : onPress}
      style={[
        styles.button,
        buttonStyle,
        { width, backgroundColor: disabled ? "#c0c0c0" : "#007bff" },
      ]}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  width: PropTypes.string,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 6,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CustomButton;
