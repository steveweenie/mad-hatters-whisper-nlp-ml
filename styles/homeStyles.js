import { StyleSheet } from 'react-native';
import { colors, fonts } from './theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: fonts.bold,
        color: colors.primaryPurple,
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.lavender,
        borderRadius: 10,
        padding: 15,
        minHeight: 100,
        marginBottom: 20,
        fontSize: 16,
        fontFamily: fonts.regular,
    },
    button: {
        backgroundColor: colors.lightPurple,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontFamily: fonts.bold,
        fontSize: 16,
    },
    resultContainer: {
        marginTop: 30,
        padding: 15,
        backgroundColor: colors.palePurple,
        borderRadius: 10,
    },
    resultText: {
        fontSize: 16,
        color: colors.deepPurple,
        fontFamily: fonts.regular,
    },
    characterText: {
        fontSize: 20,
        fontFamily: fonts.bold,
        color: colors.deepPurple,
        marginTop: 5,
    },
});