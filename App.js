import * as React from 'react';
import {Text,View,StyleSheet,TextInput,Image,TouchableOpacity,Alert} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from "./localdb";
import PhonicSoundButton from './components/PhonicSoundButton'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds:[]
    };
  }
  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor={'orange'}
            centerComponent={{
              text: 'monkie chunkie',
              style: { color: 'midnight blue', fontSize: 20 },
            }}
          />
          <Image
            style={styles.imageIcon}
            source={{
              uri: 'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',
            }}
          />
          <TextInput
            style={styles.inputbox}
            onChangeText={text => {
              this.setState({ text: text });
            }}
            value={this.state.text}
          />
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => {
            var word = this.state.text.toLowerCase().trim();
              db[word]?(
              this.setState({ chunks: db[word].chunks }),
              this.setState({ phonicSounds: db[word].phones})
              ):
              Alert.alert("this word is unaible")
            }}>
            <Text style={styles.buttonText}>go</Text>
          </TouchableOpacity>
          <View>
            {this.state.chunks.map((item,index) => {
              return (
              <PhonicSoundButton
              wordChunk={this.state.chunks[index]}
              soundChunk={this.state.phonicSounds[index]}
              buttonIndex = {index}
              />
              );
            })}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputbox: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 95,
  },
  chunkButton: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'red',
  },
});
