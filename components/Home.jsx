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

    // In your Home.jsx component
    const handlePredict = async () => {
        setLoading(true);
        try {
        const response = await fetch('http://10.180.91.15:5000/predict', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText }),
        });
        
        const data = await response.json();
        if (data.error) {
            setPrediction(`Error: ${data.error}`);
        } else {
            setPrediction(data.character);
        }
        } catch (error) {
        setPrediction("Failed to connect to the server");
        } finally {
        setLoading(false);
        }
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