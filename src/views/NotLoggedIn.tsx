import React, {useState} from 'react';
import asyncStorage from '@react-native-async-storage/async-storage';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {postLogin} from '../services/accountService';
import {setAxios} from '../services/axios';
import appStore from '../store/app';
import Hcaptcha from '../components/Hcaptcha';
import popoutStore from '../store/popouts';

export default () => {
  const [page, setPage] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../assets/profile-logo.png')}
        />
      </View>
      <View style={styles.innerContainer}>
        {page === 0 && (
          <LoginOrSignup callback={navigate => setPage(navigate)} />
        )}
        {page === 2 && <Login />}
      </View>
    </View>
  );
};

const LoginOrSignup = ({callback}: {callback: (page: number) => any}) => (
  <View style={styles.items}>
    <Pressable style={styles.primaryButton}>
      <Text style={{color: 'white', textAlign: 'center'}}>
        Create An Account
      </Text>
    </Pressable>
    <Pressable style={styles.secondaryButton} onPress={() => callback(2)}>
      <Text style={{color: 'white', textAlign: 'center'}}>Login Instead</Text>
    </Pressable>
  </View>
);
const Login = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginClicked = (captchaToken?: string) => {
    if (loggingIn) return;
    setLoggingIn(true);

    postLogin(username, password, captchaToken)
      .then(res => {
        const {token} = res.data;
        asyncStorage.setItem('token', token);
        setAxios(token);
        appStore.setToken(token);
      })
      .catch(err => {
        if (err.response) {
          const {errors} = err.response.data;
          errors.forEach((error: any) => {
            if (error.code === 1) {
              popoutStore.openPopup({
                id: 'captcha',
                component: Hcaptcha,
                data: {
                  onToken: loginClicked,
                },
              });
            }
          });
        }
        setLoggingIn(false);
      });
  };

  return (
    <View style={styles.items}>
      <TextInput
        placeholder="Username#Tag/Email"
        autoCompleteType="email"
        style={styles.input}
        placeholderTextColor="rgba(255,255,255,0.4)"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="rgba(255,255,255,0.4)"
        placeholder="Password"
        autoCompleteType="password"
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Pressable style={styles.primaryButton} onPress={() => loginClicked()}>
        <Text style={{color: 'white', textAlign: 'center'}}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
  },
  innerContainer: {
    flex: 1,
  },
  items: {
    margin: 10,
    marginTop: 'auto',
  },
  primaryButton: {
    backgroundColor: '#368dff',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  secondaryButton: {
    borderColor: '#368dff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 10,
    width: '100%',
  },
  input: {
    borderColor: '#368dff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'white',
  },
});
