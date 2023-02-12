import {SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {styles} from "../../assets/css/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useTranslation} from "react-i18next";


type Props = {
    navigation: any
}

const AboutScreen = ({navigation}: Props) => {
    const {t} = useTranslation()

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.header]}>
                <TouchableHighlight activeOpacity={0.5} underlayColor="#fff" onPress={navigation.goBack}>
                    <Ionicons name="ios-chevron-back-outline" size={24}/>
                </TouchableHighlight>
            </View>
            <Text style={[localStyles.text]}>{t('thisApplicationIsMadeFor')}</Text>
            <Text style={[localStyles.text]}>{t('applicationIsMadeForEducation')}</Text>
            <Text style={[localStyles.text]}>{t('ifYouFoundAnyMistakePleaseEmail')}</Text>
            <Text style={[localStyles.text]}>{t('thankYouForUsing')}</Text>
            <Text style={[localStyles.text]}>{t('author')}</Text>
        </SafeAreaView>
    )
}

const localStyles = StyleSheet.create({
    text: {
        fontSize: 15,
        lineHeight: 20,
    }
});

export default AboutScreen;