import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';

const RadioButton = ({ label, selected, onSelect ,color,disabled}:any) => {
    const [scaleValue] = useState(new Animated.Value(1));
    const [selectedOption, setSelectedOption] = useState(null);

    const borderColor = selected ? color : 'lightgrey';

    const handlePress = () => {
        onSelect(label);
        // Perform animation when selected
        Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
        }).start();
    };



    return (
        <TouchableOpacity onPress={handlePress} disabled={disabled}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Animated.View
            style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor:borderColor,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
                transform: [
                {
                    scale: scaleValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    }),
                },
                ],
            }}
            >
            {selected && (
                <View
                style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: color,
                }}
                />
            )}
            </Animated.View>
        </View>
        </TouchableOpacity>
    );
    };
export default RadioButton;