import { Button, StyleSheet, Text, TextInput, View, } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log(user);
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const btnRegister = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }
  const logoutuser = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
  if (!user) {
    return (
      <View>
        <TextInput placeholder='Enter email' onChangeText={(e) => setEmail(e)} style={{ borderWidth: 2, borderColor: 'pink' }}></TextInput>
        <TextInput placeholder='Enter Password' onChangeText={(e) => setPassword(e)} style={{ borderWidth: 2, borderColor: 'pink' }}></TextInput>
        <Button onPress={btnRegister} title='Register now'></Button>
      </View>
    )
  } else {
    return (
      <>
        <Text>User is loggin</Text>
        <Text>{user.email}</Text>
        <Button title='log out' onPress={logoutuser}></Button>
      </>
    )
  }
}

export default App

const styles = StyleSheet.create({})


// --------------------------------------Phone number Authentication--------------------------------------------------------------

// import { View, Text } from 'react-native'
// import React from 'react'

// const App = () => {

//   return (
//     <View>
//       <Text></Text> 
//     </View>
//   )
// }

// export default App