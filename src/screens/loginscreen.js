import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

const Loginscreen = ({ navigation }) => {
  const [fdata, setfdata] = useState({
    name: '',
    password: '',
  });
  const [errormsg, seterrormsg] = useState(null);

  const sendtobackend = () => {
    if (fdata.name === '' || fdata.password === '') {
      seterrormsg('All fields are required');
      return;
    } else {
      fetch('https://localhost:1234/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fdata),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            seterrormsg(data.error);
          } else {
            // Clear the error message
            seterrormsg(null);
            // Navigate to the Dashboard
            navigation.navigate('Dashboard');
          }
        })
        .catch((error) => {
          seterrormsg('An error occurred. Please try again later.');
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head1}>Log In</Text>
      <Text style={styles.head2}>Sign in to continue</Text>
      {errormsg ? <Text style={styles.errmsg}>{errormsg}</Text> : null}
      <View style={styles.formgroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) =>
            setfdata({
              ...fdata,
              name: text,
            })
          }
        />
      </View>
      <View style={styles.formgroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) =>
            setfdata({
              ...fdata,
              password: text,
            })
          }
        />
      </View>
      <View style={styles.link}>
        <Text>Forgot your password?</Text>
      </View>
      <View>
        <Text style={styles.button} onPress={sendtobackend}>
          Login
        </Text>
      </View>
      <Text style={styles.link2} onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Create
      </Text>
    </View>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  head1: {
    fontSize: 30,
    color: '#000',
    textAlign: 'center',
    margin: 10,
  },
  head2: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  formgroup: {
    marginBottom: 20,
    width: '80%',
  },
  label: {
    fontSize: 17,
    color: '#000',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    color: '#000',
  },
  errmsg: {
    color: 'red',
    fontSize: 16,
    backgroundColor: '#ffe6e6',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 20,
    width: '80%',
  },
  link: {
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  link2: {
    textAlign: 'center',
    marginTop: 20,
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
  button: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    textAlign: 'center',
  },
});
