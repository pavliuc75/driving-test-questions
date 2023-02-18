import {FlatList, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import questionsHelper from "../../assets/questionsHelper";
import {styles} from "../../assets/css/styles";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import RegularButton from "../RegularButton";
import {useTranslation} from "react-i18next";

type Props = {
    navigation: any
}

const CategorySelectScreen = ({navigation}: Props) => {
    const {t, i18n} = useTranslation()

    return (
        <SafeAreaView>
            <View style={[styles.header, localStyles.header]}>
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor="#fff"
                    onPress={navigation.goBack}>
                    <Ionicons name="ios-chevron-back-outline"
                              size={24}/>
                </TouchableHighlight>
                <Text style={[localStyles.headerTitleText]}>{t('afterCategory')}</Text>
                <View style={{width: 24}}></View>
            </View>
            <FlatList style={[localStyles.flatList]}
                      data={questionsHelper.getQuestionSets()}
                      renderItem={({item, index}) =>
                          <RegularButton
                            onPress={() => navigation.push('CategoryMode', {questionSet: item})}
                            text={item.category[i18n.language]}
                            isArrowForward/>}
                      ItemSeparatorComponent={() => <View style={{marginBottom: 14}}></View>}
                      ListFooterComponent={() => <View style={{marginBottom: 72}}></View>}
                      showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const localStyles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitleText: {
        fontWeight: '600',
        fontSize: 13,
    },
    flatList: {
        paddingHorizontal: 16,
        paddingTop: 16,
    }
});

export default CategorySelectScreen;