import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  NativeModules,
  StyleSheet,
} from 'react-native';

const { NativeBridge } = NativeModules;

const HomeScreen = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const openNativeScreen = () => {
    const data = {
      message: message,
    };
    NativeBridge.openSwiftUIScreen(data, (result: any) => {
      setResponse(result.response);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Screen</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter message for SwiftUI"
        value={message}
        onChangeText={setMessage}
      />

      <View style={styles.buttonContainer}>
        <Button title="Open SwiftUI Screen" onPress={openNativeScreen} />
      </View>

      {response ? (
        <Text style={styles.responseText}>
          Response from SwiftUI: {response}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  responseText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;