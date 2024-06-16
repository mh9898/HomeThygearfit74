import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, ViewStyle} from 'react-native';

type GameBtnProps = {
  color: string;
  onPress: (color: string) => void;
  style?: ViewStyle;
};

const GameBtn_Props: React.FC<GameBtnProps> = ({color, onPress, style}) => {
  const [highlighted, setHighlighted] = useState(false);

  const handlePressIn = () => {
    setHighlighted(true);
  };

  const handlePressOut = () => {
    setHighlighted(false);
    onPress(color);
  };

  const backgroundColor = {
    green: '#22c55e',
    red: '#ef4444',
    yellow: '#facc15',
    blue: '#3b82f6',
  }[color];

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.button,
        {backgroundColor},
        highlighted && {opacity: 0.5},
        style,
      ]}>
      <Text style={styles.text}>{color}</Text>
    </TouchableOpacity>
  );
};

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

export default GameBtn_Props;
