import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, AppRegistry, TextInput } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      text: ''
    }
  }
  render() {
    return (
      <View >
        <Text style={styles.header}></Text>

        <Text style={styles.welcome}>Офіційний курс гривні до іноземних валют</Text>
        <TextInput
          placeholder='Пошук...'
          style={styles.input}
          onChangeText={(text) => this.setState({ text: text })}
          value={this.state.text}
        />

        <ScrollView style={styles.container}>
          {this.state.data
            .filter((item) => {
              if (this.state.text.length !== 0) {
                return item.txt.toLowerCase().match((this.state.text).toLowerCase());
              }
              return item
            })
            .map((a, key) => {
              return (
                <Text key={key}>
                  <Text style={styles.h1}>{a.txt + '\n'}</Text>
                  <Text>Продаж: {a.rate + '\n'}</Text>
                  <Text>Дата: {a.exchangedate + '\n'}</Text>
                </Text>

              )
            })}
        </ScrollView>
      </View>
    );
  }
  componentDidMount() {
    this.fetchApi();
  }
  fetchApi = () => {
    let url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data });
        console.log(data);
      })
  }

}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: 'transparent',
    ...ifIphoneX({
      paddingTop: 50
    }, {
        paddingTop: 20
      })
  },
  container: {
    marginLeft: 25,
    marginTop: 15,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  h1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 15,
    marginRight: 15
  }
});
AppRegistry.registerComponent('ExchangeRates', () => App);