import {Alert, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {styles} from "../../assets/css/styles";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useEffect, useState} from "react";
import questionsHelper, {Question} from "../../assets/questionsHelper";
import QuestionSection from "../QuestionSection";
import {useTranslation} from "react-i18next";

type Props = {
    navigation: any,
}

enum ExamFinishReasons {
    TIME_IS_UP,
    TOO_MANY_WRONG_ANSWERS,
    TOO_MANY_CORRECT_ANSWERS,
}

const NUMBER_OF_CORRECT_ANSWERS_TO_PASS = 17;
const NUMBER_OF_WRONG_ANSWERS_TO_FAIL = 4;
const EXAM_DURATION_IN_SECONDS = 1800;
const NUMBER_OF_QUESTIONS = 20;

const ExamModeScreen = ({navigation}: Props) => {
    const {t} = useTranslation();

    const [currentQuestionSecondaryId, setCurrentQuestionSecondaryId] = useState<number>(1);
    const [randomQuestions, setRandomQuestions] =
        useState<Array<Question & { categoryIdLiteral: string; secondaryId: number, pickedAnswerId?: number, isExplanationShown?: boolean }>>
        (questionsHelper.getRandomQuestions(NUMBER_OF_QUESTIONS));
    const [isExamFinished, setIsExamFinished] = useState<boolean>(false);
    const [secondsLeft, setSecondsLeft] = useState(EXAM_DURATION_IN_SECONDS);

    const numberOfCorrectAnswers = randomQuestions.filter((question) => question.pickedAnswerId === question.correctAnswer.id).length;
    const numberOfWrongAnswers = randomQuestions.filter((question) => question.pickedAnswerId != null
        && question.pickedAnswerId !== question.correctAnswer.id).length;
    const isAnyQuestionPicked = randomQuestions.some((question) => question.pickedAnswerId != null);


    useEffect(() => {
        if (secondsLeft === 0) {
            finishExam();
            return;
        } else if (isExamFinished) {
            return;
        }

        const intervalId = setInterval(() => {
            setSecondsLeft(prevSecondsLeft => prevSecondsLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [secondsLeft]);

    useEffect(() => {
        if ((numberOfWrongAnswers >= NUMBER_OF_WRONG_ANSWERS_TO_FAIL
            || numberOfCorrectAnswers >= NUMBER_OF_CORRECT_ANSWERS_TO_PASS) && !isExamFinished) {
            finishExam();
        }
    }, [randomQuestions]);

    function restartExam() {
        setIsExamFinished(false);
        setSecondsLeft(EXAM_DURATION_IN_SECONDS);
        setCurrentQuestionSecondaryId(1);
        setRandomQuestions(questionsHelper.getRandomQuestions(NUMBER_OF_QUESTIONS));
    }

    function formatRemainingTime() {
        const minutes = Math.floor(secondsLeft / 60);
        const remainingSeconds = secondsLeft % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    function handleGoBack() {
        navigation.goBack();
    }

    function handleUserPressedNextQuestion() {
        setCurrentQuestionSecondaryId(currentQuestionSecondaryId + 1)
    }

    function handleUserPressedPreviousQuestion() {
        setCurrentQuestionSecondaryId(currentQuestionSecondaryId - 1)
    }

    function finishExam() {
        setIsExamFinished(true);
        showExplanationForWrongAnsweredQuestions();
        let reason: ExamFinishReasons = ExamFinishReasons.TIME_IS_UP;
        if (numberOfWrongAnswers >= NUMBER_OF_WRONG_ANSWERS_TO_FAIL) {
            reason = ExamFinishReasons.TOO_MANY_WRONG_ANSWERS;
        } else if (numberOfCorrectAnswers >= NUMBER_OF_CORRECT_ANSWERS_TO_PASS) {
            reason = ExamFinishReasons.TOO_MANY_CORRECT_ANSWERS;
        }
        createExamFinishedAlert(reason);
    }

    function handleUserPickedAnAnswer(chosenAnswerId: number) {
        setRandomQuestions(randomQuestions.map((question) => {
            if (question.secondaryId === currentQuestionSecondaryId) {
                return {
                    ...question,
                    pickedAnswerId: chosenAnswerId,
                }
            }
            return question;
        }))
    }

    function handleUserToggledExplanation() {
        setRandomQuestions(randomQuestions.map((question) => {
            if (question.secondaryId === currentQuestionSecondaryId) {
                return {
                    ...question,
                    isExplanationShown: 'isExplanationShown' in question ? !question.isExplanationShown : true,
                }
            }
            return question;
        }))
    }

    function showExplanationForWrongAnsweredQuestions() {
        setRandomQuestions(randomQuestions.map((question) => {
            if (question.pickedAnswerId != null && question.pickedAnswerId !== question.correctAnswer.id) {
                return {
                    ...question,
                    isExplanationShown: true,
                }
            }
            return question;
        }))
    }

    function createExamFinishedAlert(reason: ExamFinishReasons) {
        let reasonMessage: string = '';
        if (reason === ExamFinishReasons.TIME_IS_UP) {
            reasonMessage = t('timeIsUp');
        } else if (reason === ExamFinishReasons.TOO_MANY_WRONG_ANSWERS) {
            reasonMessage = t('tooManyWrongAnswers');
        } else if (reason === ExamFinishReasons.TOO_MANY_CORRECT_ANSWERS) {
            reasonMessage = t('youGaveEnoughCorrectAnswers');
        }
        Alert.alert(numberOfWrongAnswers >= 4 ? t('youFailed') : t('youPassed'), reasonMessage, [
            {
                text: t('restart'),
                onPress: () => restartExam(),
                style: 'cancel',
            },
            {
                text: t('viewYourAnswers'),
                onPress: () => {},
            },
            {
                text: t('backToMenu'),
                onPress: () => handleGoBack(),
            },
        ]);
    }

    return (
        <SafeAreaView style={[styles.container, localStyles.container]}>
            <View style={[styles.header, localStyles.header]}>
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor="#fff"
                    onPress={handleGoBack}>
                    <Ionicons name="ios-chevron-back-outline"
                              size={24}/>
                </TouchableHighlight>
                <View style={[localStyles.header]}>
                    <View style={[localStyles.header]}>
                        <Ionicons name="ios-time-outline"
                                  size={16}/>
                        <Text style={[localStyles.headerTitleText, {marginLeft: 4}]}>{formatRemainingTime()}</Text>
                    </View>
                    <Text
                        style={[localStyles.headerTitleText, {marginLeft: 24}]}>{currentQuestionSecondaryId}/{randomQuestions.length}</Text>
                    <View style={[localStyles.header, isAnyQuestionPicked ? {marginLeft: 24} : {}]}>
                        {
                            numberOfCorrectAnswers > 0 &&
                            <View style={[localStyles.header]}>
                                <Ionicons name="ios-checkmark-sharp"
                                          color={'green'}
                                          size={16}/>
                                <Text
                                    style={[localStyles.headerTitleText, {color: 'green'}]}>{numberOfCorrectAnswers}</Text>
                            </View>
                        }
                        {
                            numberOfWrongAnswers > 0 &&
                            <View style={[localStyles.header, {marginLeft: 4}]}>
                                <Ionicons name="ios-close-sharp"
                                          color={'red'}
                                          size={16}/>
                                <Text
                                    style={[localStyles.headerTitleText, {color: 'red'}]}>{numberOfWrongAnswers}</Text>
                            </View>
                        }
                    </View>
                </View>
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor="#fff"
                    onPress={restartExam}>
                    <Ionicons name="ios-refresh-sharp"
                              size={24}/>
                </TouchableHighlight>
            </View>
            <QuestionSection question={randomQuestions[currentQuestionSecondaryId - 1]}
                             categoryIdLiteral={randomQuestions[currentQuestionSecondaryId - 1]["categoryIdLiteral"]}
                             isExplanationButtonEnabled={isExamFinished}
                             isAnswerButtonsDisabled={isExamFinished}
                             isAnswersForUnansweredQuestionsShown={isExamFinished}
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
        justifyContent: 'space-between',
    },
    headerTitleText: {
        fontWeight: '600',
        fontSize: 13,
    },
});

export default ExamModeScreen;