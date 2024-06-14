import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useNetwork } from "./Network";


export const Offline = () => {
  // Add `useIsConnected()` hook
  const {isConnected} = useNetwork();

  if (isConnected === null || isConnected) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={!isConnected} color="#991B1B" />
      <Text style={styles.message}>You are offline</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    padding: 20,
    position: "absolute",
    top: 55,
    width: "90%",
  },
  message: {
    color: "#991B1B",
  },
});