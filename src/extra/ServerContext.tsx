import React, { createContext, useState } from 'react';

export const ServerContext = createContext();

export const ServerProvider = ({ children }:any) => {
  const [serverRunning, setServerRunning] = useState(false);

  return (
    <ServerContext.Provider value={{ serverRunning, setServerRunning }}>
      {children}
    </ServerContext.Provider>
  );
};