import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { User, SystemState } from '../interfaces/reducerInterfaces';
import { Navigation } from '../interfaces/interfaces';

const UserProfileScreen = ({ navigation }: { navigation: Navigation }) => {
  const user: User = useSelector((state: SystemState) => state.user);
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Text>{user.firstName}</Text>
      <Text>{user.lastName}</Text>
      <Button
        title="Log out"
        onPress={() =>
          navigation.navigate('LoginStackNavigator', {
            screen: 'LoginScreen',
          })
        }
      />
      {/* <Text>Born in: {user.dateOfBirth}</Text> */}
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
