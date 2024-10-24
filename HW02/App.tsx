import React, { useState } from 'react';
import { Button, TextInput, View, Text, Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Import auth from your Firebase config
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeScreen() {
	const user = auth.currentUser;

	return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <Text>Welcome, {user.email}!</Text> // Display user's email
      ) : (
        <Text>No user is logged in.</Text>
      )}
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text></Text>
    </View>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle sign-up
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setErrorMessage('');
        Alert.alert('Success', 'Account created successfully!');
      })
      .catch((error) => {
        setErrorMessage(error.message);
        Alert.alert('Sign Up Failed', error.message);
      });
  };

  // Handle login
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(error.message);
        Alert.alert('Login Failed', error.message);
      });
  };

  return (
    <NavigationContainer>
      {user ? (
        <AppTabs />
      ) : (
        <View style={{ padding: 20, justifyContent: 'center', flex: 1 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
          <Button title="Sign Up" onPress={handleSignUp} />
          <Button title="Log In" onPress={handleLogin} />
        </View>
      )}
    </NavigationContainer>
  );
}
