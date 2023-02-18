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
                                style={localsStyles.touchableHighlight}
                                onPress={props.onPress}>
        <LinearGradient start={{x: 0.7, y: 0.0}} end={{x: 0.9, y: 0.0}} colors={['white', '#f5f5f5']}>
            <View style={[localsStyles.view]}>
                <Text
                    style={[localsStyles.text, localsStyles.orderNumberText, props.isCorrect ? localsStyles.correctText : {}, props.isWrong ? localsStyles.wrongText : {}, props.isSelected ? localsStyles.selectedText :{}]}>{props.orderNumber}. </Text>
                <Text
                    style={[localsStyles.text, localsStyles.mainText, props.isCorrect ? localsStyles.correctText : {}, props.isWrong ? localsStyles.wrongText : {}, props.isSelected ? localsStyles.selectedText :{}, {
                        flex: 1,
                        flexWrap: 'wrap',
                    }]}>{props.text}</Text>
            </View>
        </LinearGradient>

    </TouchableHighlight>);
}

export default AnswerButton;

const localsStyles = StyleSheet.create({
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
        fontWeight: '600'
    }
});