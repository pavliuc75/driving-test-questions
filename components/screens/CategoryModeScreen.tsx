import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "../../assets/css/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useState} from "react";
import {QuestionSet} from "../../assets/questionsHelper";
import QuestionSection from "../QuestionSection";

type Props = {
    route: { params: { questionSet: QuestionSet } }
    navigation: any
}
const CategoryModeScreen = ({route, navigation}: Props) => {

    const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
    const [questionSet, setQuestionSet] = useState<QuestionSet>(route.params.questionSet);

    function handleUserPickedAnAnswer(chosenAnswerId: number) {
        setQuestionSet({
            ...questionSet,
            questions: questionSet.questions.map((question) => {
                if (question.id === currentQuestionId) {
                    return {
                        ...question,
                        pickedAnswerId: chosenAnswerId,
                        isExplanationShown: question.isExplanationShown ? true : chosenAnswerId !== question.correctAnswer.id,
                        isAnimateExplanationShown: (chosenAnswerId !== question.correctAnswer.id) && !question.isExplanationShown
                    }
                }
                return question;
            })
        })
    }

    function handleUserToggledExplanation() {
        setQuestionSet({
            ...questionSet,
            questions: questionSet.questions.map((question) => {
                if (question.id === currentQuestionId) {
                    return {
                        ...question,
                        isExplanationShown: 'isExplanationShown' in question ? !question.isExplanationShown : true,
                        isAnimateExplanationShown: false,
                    }
                }
                return question;
            })
        })
    }

    function handleUserPressedNextQuestion() {
        disableAnimateExplanationShown();
        setCurrentQuestionId(currentQuestionId + 1)
    }

    function handleUserPressedPreviousQuestion() {
        disableAnimateExplanationShown();
        setCurrentQuestionId(currentQuestionId - 1)
    }

    function disableAnimateExplanationShown() {
        setQuestionSet({
            ...questionSet,
            questions: questionSet.questions.map((question) => {
                if (question.id === currentQuestionId) {
                    return {
                        ...question,
                        isAnimateExplanationShown: false,
                    }
                }
                return question;
            })
        })
    }

    return (
        <SafeAreaView style={[styles.container, {flex: 1, justifyContent: 'space-between'}]}>
            <View style={[styles.header, localStyles.header]}>
                <TouchableHighlight activeOpacity={0.5} underlayColor="#fff" onPress={navigation.goBack}>
                    <Ionicons name="ios-chevron-back-outline" size={24}/>
                </TouchableHighlight>
                <Text
                    style={[localStyles.headerTitleText]}>{questionSet.category.idLiteral} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {currentQuestionId}/{questionSet.questions.length}</Text>
                <View style={{width: 24}}></View>
            </View>
            <QuestionSection question={questionSet.questions[currentQuestionId - 1]}
                             categoryIdLiteral={questionSet.category.idLiteral}
                             isExamMode={false}
                             isNextButtonHidden={currentQuestionId === route.params.questionSet.questions.length}
                             isBackButtonHidden={currentQuestionId === 1}
                             onUserPickedAnAnswer={handleUserPickedAnAnswer}
                             onUserPressedNextQuestion={handleUserPressedNextQuestion}
                             onUserPressedPreviousQuestion={handleUserPressedPreviousQuestion}
                             onUserToggledExplanation={handleUserToggledExplanation}/>
        </SafeAreaView>
    )
}

const localStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitleText: {
        fontWeight: '600',
        fontSize: 13,
    },
});

export default CategoryModeScreen;