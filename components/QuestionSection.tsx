import {FlatList, Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import questionsHelper, {Question} from "../assets/questionsHelper";
import {useTranslation} from "react-i18next";
import AnswerButton from "./AnswerButton";
import RegularButton from "./RegularButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {LightSpeedInLeft} from "react-native-reanimated";


type Props = {
    question: Question & { pickedAnswerId?: number, isExplanationShown?: boolean, isAnimateExplanationShown?: boolean },
    categoryIdLiteral: string,
    isNextButtonHidden: boolean,
    isBackButtonHidden: boolean,
    isExplanationButtonEnabled: boolean,
    isAnswerButtonsDisabled?: boolean,
    isAnswersForUnansweredQuestionsShown?: boolean,
    onUserPickedAnAnswer: (chosenAnswerId: number) => void,
    onUserToggledExplanation: () => void,
    onUserPressedNextQuestion: () => void,
    onUserPressedPreviousQuestion: () => void,
}

const QuestionSection = (props: Props) => {
    const {t, i18n} = useTranslation();

    return (<View style={{flex: 1}}>
        <FlatList style={[localStyles.flatList]} data={props.question.answers}
                  inverted={true}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{justifyContent: 'flex-end', flexDirection: 'column-reverse', flexGrow: 1}}
                  renderItem={({item}) => <AnswerButton orderNumber={item.id}
                                                        disabled={props.question.pickedAnswerId != null || props.isAnswerButtonsDisabled}
                                                        isCorrect={item.id === props.question.correctAnswer.id && props.question.pickedAnswerId != null}
                                                        isWrong={item.id === props.question.pickedAnswerId && item.id !== props.question.correctAnswer.id}
                                                        isSelected={props.isAnswersForUnansweredQuestionsShown && item.id === props.question.correctAnswer.id}
                                                        text={item.answer[i18n.language]}
                                                        onPress={() => props.onUserPickedAnAnswer(item.id)}/>}
                  ListHeaderComponent={() => {
                      return (
                          <>
                              {props.question.image && <Image style={[localStyles.image]}
                                                              defaultSource={questionsHelper.images[props.categoryIdLiteral][props.question.id]}/>}
                              <Text style={[localStyles.questionText]}>{props.question.question[i18n.language]}</Text>
                          </>
                      )
                  }}
                  ListFooterComponent={() => {
                      return (
                          <>
                              {props.question.isExplanationShown ?
                                  <Animated.View
                                      entering={props.question.isAnimateExplanationShown ? LightSpeedInLeft : null}
                                      style={[localStyles.correctAnswer]}>
                                      <Text
                                          style={[localStyles.text]}>{props.question.correctAnswer.explanation[i18n.language]}</Text>
                                  </Animated.View> :
                                  <View style={[{height: 28}]}></View>
                              }
                          </>
                      )
                  }}
        />
        <View style={[localStyles.footer]}>
            {props.isExplanationButtonEnabled ? <TouchableHighlight
                onPress={props.onUserToggledExplanation}
                style={[localStyles.touchableHighlight]}
                activeOpacity={0.5} underlayColor="#fff">
                {props.question.isExplanationShown ? <Ionicons name="ios-chevron-up-outline"
                                                               size={20}/> :
                    <Text style={[localStyles.text]}>?</Text>}
            </TouchableHighlight> : <View></View>}
            <View style={[localStyles.navigationButtonsWrapper]}>
                {!props.isBackButtonHidden && <TouchableHighlight style={[localStyles.backButton]}
                                                                  onPress={() => props.onUserPressedPreviousQuestion()}
                                                                  activeOpacity={0.5} underlayColor="#fff">
                    <Ionicons name="ios-arrow-back"
                              size={20}/>
                </TouchableHighlight>}
                {!props.isNextButtonHidden &&
                    <RegularButton isArrowForward onPress={() => props.onUserPressedNextQuestion()}
                                   text={t('next')}></RegularButton>}
            </View>
        </View>
    </View>);
}

const localStyles = StyleSheet.create({
    questionText: {
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 20,
        marginBottom: 16,
    },
    flatList: {
        paddingBottom: 28,
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 400 / 295,
        marginBottom: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    touchableHighlight: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        height: 32,
        width: 32,
        borderRadius: 99,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    correctAnswer: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        marginVertical: 18
    },
    navigationButtonsWrapper: {
        flexDirection: 'row',
    },
    backButton: {
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 32,
        paddingRight: 4,
    },
    disabled: {
        opacity: 0.5,
    }
});

export default QuestionSection;
