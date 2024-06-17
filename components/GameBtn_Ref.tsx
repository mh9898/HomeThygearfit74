import React, {forwardRef} from 'react';
import {TouchableOpacity, StyleSheet, Text, ViewStyle} from 'react-native';

type GameBtnProps = {
  color: string;
  onPress: () => void;
  style?: ViewStyle;
};

const GameBtn = forwardRef<TouchableOpacity, GameBtnProps>(
  ({color, onPress, style}, ref) => {
    const backgroundColor = {
      green: '#22c55e',
      red: '#ef4444',
      yellow: '#facc15',
      blue: '#3b82f6',
    }[color];

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[styles.button, {backgroundColor}, style]}>
        <Text style={styles.text}>{color}</Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 90,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GameBtn;
