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
      	<Text>
			The Bee Movie (2007) is an animated comedy film that follows the story of Barry B. Benson, a honeybee who has just graduated from college and is disillusioned by the prospect of spending his entire life working in the hive. 
			Eager for more adventure, Barry ventures outside the hive and forms a friendship with a human florist named Vanessa. As Barry learns more about the human world, he is shocked to discover that humans exploit bees by stealing their honey. Outraged, he decides to sue the human race, leading to a court battle that ends in favor of the bees. 
			However, the victory has unintended consequences: without the need to produce honey, the bees stop pollinating plants, which causes flowers and plants to die.
			Realizing that the world is in danger without bees doing their essential work, Barry and Vanessa work together to revive the plant life by transporting flowers from a parade. In the end, Barry learns to appreciate his role in the hive, and the balance between bees and humans is restored.
		</Text>
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
