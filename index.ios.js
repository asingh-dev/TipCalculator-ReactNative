import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Slider,
  AlertIOS,
  VibrationIOS
} from 'react-native';
import TipSelector from './tip-selector';

export default class TipCalculator extends Component {
  state = {
    amountTotal: 0,
    tipPercent: 0.15,
    tipTotal: 0,
    split: 1,
    amountPerPerson: 0,
  };

calculateTip(value) {
  if (isNaN(value)==false) {
    this.state.amountTotal = parseInt(value);
    this.state.tipTotal = value * this.state.tipPercent;
    this.setState(this.state);
    this.splitBill(this.state.split);
    // console.log(value);
  }
  else {
  }
}

splitBill(value) {
  // debugger;
  if (isNaN(value)==false) {
    // console.log(value);
    this.state.split = value;
    this.state.amountPerPerson = (parseInt(this.state.amountTotal) + parseInt(this.state.tipTotal))/value;
    this.setState(this.state);
  }
  this.state.amountPerPerson = isNaN(this.state.amountPerPerson)
                                ? 0.0
                                : this.state.amountPerPerson
}

updateTipPercentage(value) {
  // console.log("updateTipPercentage", value);

  VibrationIOS.vibrate();

  AlertIOS.alert(
   'Tip Updated!'
  );

  this.state.tipPercent = value;
  this.calculateTip(this.state.amountTotal);
  this.setState(this.state);
}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowheading}>
          <Text style={styles.heading}>
            💰💵🤑  Tip Calulator  🤑💵💰
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, styles.inputLabel]}>
            Amount Total:
          </Text>
          <TextInput
            style={styles.TextInput}
            keyboardType='numeric'
            onChangeText={this.calculateTip.bind(this)} >
          </TextInput>
        </View>

        <TipSelector
          selectionChanged = {this.updateTipPercentage.bind(this)}
          style={styles.row} />

        <View style={styles.row}>
          <Text style={[styles.label, styles.labelSplit]}>
            Split Amongst {this.state.split}:
          </Text>
        </View>
        <View style={styles.row}>
          <Slider
            maximumValue={10}
            minimumValue={1}
            step={1}
            onValueChange={this.splitBill.bind(this)}
            value={this.state.split}
            style={styles.slider}/>
        </View>

        <View style={styles.row}>
          <Text style={styles.labelTotal}>
            Total Tip:
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.amount}>
            ${this.state.tipTotal.toFixed(2)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.labelTotal}>
            Amount Per Person:
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.amount}>
            ${this.state.amountPerPerson.toFixed(2)}
          </Text>
        </View>
        <View style={styles.rowFooter}>
          <Text style={styles.footer} >
            © Aman・Internet Programming・Spring 2017・CCNY
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    justifyContent: 'center',
    fontWeight: 'bold',
    color: 'gold',
  },
  rowheading: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#60b7e2',
    marginBottom: 20,
  },
  inputLabel: {
    bottom: -10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EBF5FB',
  },
  labelSplit: {
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  TextInput: {
    textAlign: 'left',
    color: '#1A5276',
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 5,
    margin: 10,
    height: 50,
    borderColor: '#60b7e2',
    borderWidth: 1,
    borderRadius: 5,
    flex: 2,
  },
  amount: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 2,
    color: '#1A5276'
  },
  slider: {
    margin: 40,
    height: 40,
    flex: 2,
  },
  label: {
    textAlign: 'center',
    margin: 10,
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
    color: '#60b7e2'
  },
  labelTotal: {
    textAlign: 'center',
    margin: 10,
    fontSize: 18,
    flex: 2,
    fontWeight: 'bold',
    color: '#60b7e2'
  },
  rowFooter: {
    backgroundColor: '#60b7e2',
    height: 40,
    marginTop: 110,
    justifyContent: 'center',
  },
  footer: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('TipCalculator', () => TipCalculator);
