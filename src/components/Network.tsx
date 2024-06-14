import NetInfo from "@react-native-community/netinfo";
import type { PropsWithChildren } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";

interface NetworkContextProps {
  isConnected: boolean | null;
}

const NetworkContext = createContext<NetworkContextProps>(
  {} as NetworkContextProps
);

export const NetworkProvider = ({ children }: PropsWithChildren) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    // use `NetInfo.addEventListener` to listen to network status changes
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      // store the network status in the `isConnected` state
      setIsConnected(state.isConnected);
    });

    // use `NetInfo.fetch` to get the current network status
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      // store the network status in the `isConnected` state
      setIsConnected(state.isConnected);
    });

    // unsubscribe from the network status listener
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
