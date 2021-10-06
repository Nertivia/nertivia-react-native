import React, {useRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
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
    <Pressable style={styles.createAccountButton}>
      <Text style={{color: 'white', textAlign: 'center'}}>
        Create An Account
      </Text>
    </Pressable>
    <Pressable style={styles.loginButton} onPress={() => callback(2)}>
      <Text style={{color: 'white', textAlign: 'center'}}>Login Instead</Text>
    </Pressable>
  </View>
);
const Login = () => (
  <View style={styles.items}>
    <TextInput placeholder="Email/Username" autoCompleteType="email" />
    <TextInput
      placeholder="Password"
      autoCompleteType="password"
      secureTextEntry={true}
    />
  </View>
);

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
  createAccountButton: {
    backgroundColor: '#368dff',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  loginButton: {
    borderColor: '#368dff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 10,
    width: '100%',
  },
});
