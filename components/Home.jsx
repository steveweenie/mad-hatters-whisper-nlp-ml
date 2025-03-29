import { loadPyodide } from 'pyodide';
import { useEffect, useState } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';
import modelScript from './model.py?raw'; // Import as raw text

export default function Home() {
    const [inputText, setInputText] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pyodide, setPyodide] = useState(null);

    // Initialize Pyodide
    useEffect(() => {
        const initPyodide = async () => {
        const pyodideInstance = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
        });
        await pyodideInstance.loadPackage(['scikit-learn', 'pandas']);
        setPyodide(pyodideInstance);
        };
        initPyodide();
    }, []);

    const handlePredict = async () => {
        if (!pyodide) return;
        
        setLoading(true);
        try {
        // Inject Python script
        await pyodide.runPythonAsync(modelScript);
        
        // Call prediction function
        const result = await pyodide.runPythonAsync(`
            predict_character("${inputText.replace(/"/g, '\\"')}")
        `);
        setPrediction(result);
        } catch (error) {
        setPrediction(`Error: ${error.message}`);
        } finally {
        setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
        <TextInput 
            value={inputText}
            onChangeText={setInputText}
            placeholder="Enter Wonderland dialogue..."
        />
        <Pressable onPress={handlePredict}>
            <Text>{loading ? "Thinking..." : "Predict"}</Text>
        </Pressable>
        {prediction && <Text>Character: {prediction}</Text>}
        </View>
    );
}