import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const JobListingScreen = ({ route, navigation }) => {
  const [jobs, setJobs] = useState([]);
  const { user } = route.params;

  useEffect(() => {
    // Dummy jobs ke liye API call ya static data use karo
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome, {user.name}!</Text>
      
      <FlatList
        data={jobs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{
            padding: 15,
            backgroundColor: '#2ecc71',
            marginVertical: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ccc',
          }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.company}</Text>
            <Text>{item.location}</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20, backgroundColor: '#9b59b6', padding: 15, borderRadius: 5 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JobListingScreen;
