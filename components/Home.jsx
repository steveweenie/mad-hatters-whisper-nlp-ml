import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import styles from '../styles/homeStyles';

const HomeComponent = () => {
    const [inputText, setInputText] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const samplePredictions = {
        "off with their heads": "Queen of Hearts",
        "we're all mad here": "Cheshire Cat",
        "curiouser and curiouser": "Alice",
        "why is a raven like a writing desk": "Mad Hatter",
    };

    const handlePredict = () => {
        setLoading(true);
        setTimeout(() => {
        const lowerCaseInput = inputText.toLowerCase();
        const result = samplePredictions[lowerCaseInput] || "Unknown Character";
        setPrediction(result);
        setLoading(false);
        }, 1000);
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Mad Hatter's Whisper: Speech Classifier</Text>
        
        <TextInput
            style={styles.input}
            placeholder="Type a line from Alice in Wonderland..."
            value={inputText}
            onChangeText={setInputText}
            multiline
        />
        
        <Pressable 
            style={styles.button} 
            onPress={handlePredict}
            disabled={loading}
        >
            <Text style={styles.buttonText}>
            {loading ? "Thinking..." : "Predict Character"}
            </Text>
        </Pressable>
        
        {prediction && (
            <View style={styles.resultContainer}>
            <Text style={styles.resultText}>This sounds like:</Text>
            <Text style={styles.characterText}>{prediction}</Text>
            </View>
        )}
        </View>
    );
    };

export default HomeComponent;