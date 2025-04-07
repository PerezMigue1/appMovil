// UserContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    email?: string;
    // Add other user properties as needed
} | null;

type UserContextType = {
    user: User;
    setUser: (user: User) => void;
};

// Create context with initial values
export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
});

// Custom hook for easy access
export const useUser = () => useContext(UserContext);

// Context Provider
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(null);

    // Load user from AsyncStorage on initial render
    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error("Error loading user from AsyncStorage", error);
            }
        };

        loadUser();
    }, []);

    // Save or remove user from AsyncStorage when it changes
    useEffect(() => {
        const saveUser = async () => {
            try {
                if (user) {
                    await AsyncStorage.setItem('user', JSON.stringify(user));
                } else {
                    await AsyncStorage.removeItem('user');
                }
            } catch (error) {
                console.error("Error saving user to AsyncStorage", error);
            }
        };

        saveUser();
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};