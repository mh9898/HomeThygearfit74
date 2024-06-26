import React, {forwardRef} from 'react';
import {TouchableOpacity, StyleSheet, Text, ViewStyle} from 'react-native';
import {COLORSBUTTONS} from '../utils/ColorsButtons';

type GameBtnProps = {
  color: string;
  onPress: (color: string) => void;
  style?: ViewStyle;
};

const GameBtn = forwardRef<TouchableOpacity, GameBtnProps>(
  ({color, onPress, style}, ref) => {
    const backgroundColor = {
      green: COLORSBUTTONS.green, //'#22c55e',
      red: COLORSBUTTONS.red, //'#ef4444',
      yellow: COLORSBUTTONS.yellow, //'#f59e0b',
      blue: COLORSBUTTONS.blue, //'#3b82f6',
    }[color];

    return (
      <TouchableOpacity
        ref={ref}
        onPress={() => onPress(color)}
        style={[styles.button, {backgroundColor}, style]}>
        <Text style={styles.text}>{color}</Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 50,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GameBtn;
