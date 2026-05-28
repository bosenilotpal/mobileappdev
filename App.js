import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import Navigation from "./components/navigation";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Navigation />
      <Toast />
    </>
  );
}
