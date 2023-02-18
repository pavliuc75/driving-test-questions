import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {useState} from "react";
import questionsHelper, {Question} from "../../assets/questionsHelper";
import {styles} from "../../assets/css/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import {SafeAreaView} from "react-native-safe-area-context";
import QuestionSection from "../QuestionSection";

type Props = {
    navigation: any
}
const RandomModeScreen = ({navigation}: Props) => {
    const [currentQuestionSecondaryId, setCurrentQuestionId] = useState<number>(1);
    const [randomQuestions, setRandomQuestions] = useState<Array<Question & { categoryIdLiteral: string; secondaryId: number }>>(questionsHelper.getRandomQuestions);

    function handleUserPickedAnAnswer(chosenAnswerId: number) {
        setRandomQuestions(randomQuestions.map((question) => {
            if (question.secondaryId === currentQuestionSecondaryId) {
                return {
                    ...question,
                    pickedAnswerId: chosenAnswerId,
                    isExplanationShown: question.isExplanationShown ? true : chosenAnswerId !== question.correctAnswer.id,
                    isAnimateExplanationShown: (chosenAnswerId !== question.correctAnswer.id) && !question.isExplanationShown
                }
            }
            return question;
        }))
    }

    function handleUserPressedNextQuestion() {
        disableAnimateExplanationShown();
        setCurrentQuestionId(currentQuestionSecondaryId + 1)
    }

    function handleUserPressedPreviousQuestion() {
        disableAnimateExplanationShown();
        setCurrentQuestionId(currentQuestionSecondaryId - 1)
    }

    function handleUserToggledExplanation() {
        setRandomQuestions(randomQuestions.map((question) => {
            if (question.secondaryId === currentQuestionSecondaryId) {
                return {
                    ...question,
                    isExplanationShown: 'isExplanationShown' in question ? !question.isExplanationShown : true,
                    isAnimateExplanationShown: false,
                }
            }
            return question;
        }))
    }

    function disableAnimateExplanationShown() {
        setRandomQuestions(randomQuestions.map((question) => {
            if (question.secondaryId === currentQuestionSecondaryId) {
                return {
                    ...question,
                    isAnimateExplanationShown: false,
                }
            }
            return question;
        }));
    }

    return (
        <SafeAreaView style={[styles.container, localStyles.container]}>
            <View style={[styles.header, localStyles.header]}>
                <TouchableHighlight activeOpacity={0.5} underlayColor="#fff" onPress={navigation.goBack}>
                    <Ionicons name="ios-chevron-back-outline" size={24}/>
                </TouchableHighlight>
            </View>
            <QuestionSection question={randomQuestions[currentQuestionSecondaryId - 1]}
                             categoryIdLiteral={randomQuestions[currentQuestionSecondaryId - 1]["categoryIdLiteral"]}
                             isExamMode={false}
                             isBackButtonHidden={currentQuestionSecondaryId === 1}
                             isNextButtonHidden={currentQuestionSecondaryId === randomQuestions.length}
                             onUserPickedAnAnswer={handleUserPickedAnAnswer}
                             onUserPressedNextQuestion={handleUserPressedNextQuestion}
                             onUserPressedPreviousQuestion={handleUserPressedPreviousQuestion}
                             onUserToggledExplanation={handleUserToggledExplanation}/>
        </SafeAreaView>
    )
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default RandomModeScreen;