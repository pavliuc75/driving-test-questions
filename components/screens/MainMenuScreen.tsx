import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "../../assets/css/styles";
import RegularButton from "../RegularButton";
import {useTranslation} from 'react-i18next'

type Props = {
    navigation: any
}

const MainMenuScreen = ({navigation}: Props) => {
    const {t, i18n} = useTranslation()

    function switchLocale() {
        i18n.language === 'ro' ? i18n.changeLanguage('ru') : i18n.changeLanguage('ro')
    }

    return (
        <SafeAreaView style={[styles.container, localStyles.container]}>
            <TouchableHighlight style={[localStyles.toAboutScreenButton]} activeOpacity={0.12} underlayColor="#fff"
                                onPress={() => navigation.push('About')}>
                <Text style={[localStyles.toAboutScreenButtonText]}>{t('aboutTheApp')}</Text>
            </TouchableHighlight>
            <View style={{flex: 1}}></View>
            <TouchableHighlight style={[localStyles.languageSwitcherButton]} activeOpacity={0.5} underlayColor="#fff"
                                onPress={switchLocale}>
                <View style={{flexDirection: 'row'}}>
                    <Text
                        style={i18n.language === 'ro' ? localStyles.currentLanguageButtonText : localStyles.otherLanguageButtonText}>ro</Text>
                    <View style={{marginRight: 8}}></View>
                    <Text
                        style={i18n.language === 'ru' ? localStyles.currentLanguageButtonText : localStyles.otherLanguageButtonText}>ру</Text>

                </View>
            </TouchableHighlight>
            <RegularButton isArrowForward onPress={() => navigation.push('RandomMode')}
                           text={t('randomMode')}></RegularButton>
            <View style={{marginBottom: 24}}></View>
            <RegularButton isArrowForward onPress={() => navigation.push('ExamMode')}
                           text={t('examMode')}></RegularButton>
            <View style={{marginBottom: 24}}></View>
            <RegularButton isArrowForward onPress={() => navigation.push('CategorySelect')}
                           text={t('afterCategory')}></RegularButton>
        </SafeAreaView>
    )
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    toAboutScreenButton: {
        marginTop: 28,
    },
    toAboutScreenButtonText: {
        textDecorationLine: 'underline',
        opacity: 0.25,
        fontSize: 11,
        lineHeight: 13,
    },
    languageSwitcherButton: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        marginBottom: 24,
    },
    currentLanguageButtonText: {
        textDecorationLine: 'underline',
        fontSize: 11,
    },
    otherLanguageButtonText: {
        color: '#BEBEBE',
        fontSize: 11,
    }
});


export default MainMenuScreen;