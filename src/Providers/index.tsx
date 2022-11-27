import { NativeBaseProvider } from "native-base";
import React from "react";
import { Provider } from "react-redux";
import AppHomeScreen from "../screens/Home";
import store from "../store";

const AppProviders = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <AppHomeScreen />
      </Provider>
    </NativeBaseProvider>
  );
};

export default AppProviders;
