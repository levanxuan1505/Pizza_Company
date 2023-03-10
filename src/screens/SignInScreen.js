/* eslint-disable react-native/no-inline-styles */
// import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
// import React from 'react';

// export default function SignInScreen() {
//   return (
//     <SafeAreaView>
//       <View>
//         <Text>SignInScreen enter</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({});
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  StatusBar,
} from 'react-native';
import {Colors} from '../constants';
import Button from '../components/Button';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const SignInScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({email: '', password: ''});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email === userData.email &&
          inputs.password === userData.password
        ) {
          navigation.navigate('ButtonHome');
          AsyncStorage.setItem(
            'userData',
            JSON.stringify({...userData, loggedIn: true}),
          );
        } else {
          Alert.alert('Error', 'Invalid Details');
        }
      } else {
        Alert.alert('Error', 'User does not exist');
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: Colors.DEFAULT_WHITE, flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <Loader visible={loading} />
      <View style={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text
          style={{
            color: Colors.DEFAULT_GREEN,
            fontSize: 40,
            fontWeight: 'bold',
          }}>
          Sign In
        </Text>
        <Text
          style={{
            color: Colors.DEFAULT_GREEN,
            fontSize: 18,
            marginVertical: 10,
          }}>
          Enter Your Details to Sign in
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button title="Sign In" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('Register')}
            style={{
              color: Colors.SECONDARY_BLACK,
              fontWeight: 600,
              textAlign: 'center',
              fontSize: 16,
            }}>
            Don't have account? Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
