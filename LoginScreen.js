import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    // Simple validation
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    setErrorMessage(''); // Clear previous errors

    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      console.log('Login Success:', res.data);

      // Navigate to JobListing screen with user data
      navigation.replace('JobListing', { user: res.data.user });

      // Optionally clear email and password after success
      setEmail('');
      setPassword('');
    } catch (error) {
      setLoading(false); // Stop loading spinner

      // Display the error message
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Show server error message
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.'); // Generic error message
      }
      console.error('Login Error:', error.response?.data?.message || error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      {/* Show error message if there's one */}
      {errorMessage ? <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text> : null}

      {/* Show loading indicator while processing */}
      <TouchableOpacity 
        onPress={handleLogin} 
        style={{
          backgroundColor: '#e74c3c', // Changed button color to a custom red
          padding: 15, 
          borderRadius: 5, 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignItems: 'center',
        }}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{ color: '#fff', textAlign: 'center' }}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
