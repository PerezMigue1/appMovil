// App.tsx
import React from 'react';
import { UserProvider } from './app/screens/UserContext';
import AppNavigator from './app/navigation/AppNavigator';

const App = () => {
  return (
    <UserProvider>
        <AppNavigator />
    </UserProvider>
);
};

export default App;