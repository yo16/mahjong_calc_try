import { useState } from "react";
import QuestionList from "./questionList";

import "./questionBox.css";

/* questionsのdict配列の要素
question: 質問,
answers: ["2符","4符","8符","16符","32符"],
correct_answer: index,
result: 0:未回答, 1:正解, -1:不正解
*/

const QuestionBox = ({
    questions = [],
    onStart = f => f,
    onAnswer = f => f,
    onEndOfQuestions = f => f,
}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
    const [isStarting, setIsStarting] = useState(false);

    const handleOnStart = () => {
        onStart();
        setCurrentQuestionIndex(0);
        setIsStarting(true);
    }

    const handleOnAnswer = (q_i, input_a_i) => {
        onAnswer(q_i, input_a_i);

        if (currentQuestionIndex >= questions.length-1) {
            // 終了
            //setCurrentQuestionIndex(-1);
            setIsStarting(false);
            onEndOfQuestions();
            return;
        }

        setCurrentQuestionIndex(currentQuestionIndex+1);
    }

    return (
        <>
            <QuestionList
                questions = {questions}
                currentQuestionIndex = {currentQuestionIndex}
            />
            {((currentQuestionIndex<0) || !isStarting) &&
                <button className="button-19" onClick={handleOnStart}>開始?</button>
            }
            {((currentQuestionIndex>=0) && isStarting) &&
                questions[currentQuestionIndex].answers.map((a, i) => (
                    <button
                        onClick = {() => handleOnAnswer(currentQuestionIndex, i)}
                        className = "button-19"
                        key = {`qbox_button_${i}`}
                    >{a}</button>
                ))
            }
        </>
    );
};

export default QuestionBox;
