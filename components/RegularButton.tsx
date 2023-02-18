import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    onPress: () => void,
    text: string,
    isArrowForward?: boolean,
    isArrowBack?: boolean,
}

const RegularButton = (props: Props) => {
    return (
        <TouchableHighlight style={[styles.touchableHighlight]}
                            activeOpacity={0.5}
                            underlayColor="#fff"
                            onPress={props.onPress}>
            <View style={[styles.view]}>
                {
                    props.isArrowBack &&
                    <Ionicons name="ios-arrow-back" size={20} style={[styles.arrowBack]}/>
                }
                <Text style={[styles.text, { flexShrink:1, flexGrow:1 }]}>{props.text}</Text>
                {
                    props.isArrowForward &&
                    <Ionicons name="ios-arrow-forward" size={20} style={[styles.arrowForward]}/>
                }
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    touchableHighlight: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 21,
    },
    arrowForward: {
        marginLeft: 16,
    },
    arrowBack: {
        marginRight: 16,
    }
});

export default RegularButton;