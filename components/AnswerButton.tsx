import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

type Props = {
    orderNumber: number,
    text: string,
    isCorrect?: boolean,
    isWrong?: boolean,
    isSelected?: boolean,
    onPress?: () => void,
    disabled?: boolean,
}

const AnswerButton = (props: Props) => {
    return (<TouchableHighlight activeOpacity={0.5}
                                disabled={props.disabled}
                                underlayColor="#fff"
                                style={styles.touchableHighlight}
                                onPress={props.onPress}>
        <LinearGradient start={{x: 0.7, y: 0.0}} end={{x: 0.9, y: 0.0}} colors={['white', '#f5f5f5']}>
            <View style={[styles.view]}>
                <Text
                    style={[styles.text, styles.orderNumberText, props.isCorrect ? styles.correctText : {}, props.isWrong ? styles.wrongText : {}, props.isSelected ? styles.selectedText :{}]}>{props.orderNumber}. </Text>
                <Text
                    style={[styles.text, styles.mainText, props.isCorrect ? styles.correctText : {}, props.isWrong ? styles.wrongText : {}, props.isSelected ? styles.selectedText :{}, {
                        flex: 1,
                        flexWrap: 'wrap',
                    }]}>{props.text}</Text>
            </View>
        </LinearGradient>

    </TouchableHighlight>);
}

export default AnswerButton;

const styles = StyleSheet.create({
    touchableHighlight: {
        paddingVertical: 4,

    },
    view: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 1,
        paddingVertical: 5,
        marginRight: 1,
        backgroundColor: '#fff',

    },
    text: {
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 20,
    },
    mainText: {
        textDecorationLine: 'underline',
    },
    orderNumberText: {
        minWidth: 16,
    },
    correctText: {
        color: 'green',
        fontWeight: '600'
    },
    wrongText: {
        color: 'red',
        fontWeight: '600'
    },
    selectedText: {
        color: 'blue',
        fontWeight: '600'
    }
});