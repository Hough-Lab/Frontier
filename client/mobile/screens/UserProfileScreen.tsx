import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { User, SystemState } from '../interfaces/reducerInterfaces';

const UserProfileScreen = () => {
  const user: User = useSelector((state: SystemState) => state.user);
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Text>{user.firstName}</Text>
      <Text>{user.lastName}</Text>
      <Text>Born in: {user.dateOfBirth}</Text>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
