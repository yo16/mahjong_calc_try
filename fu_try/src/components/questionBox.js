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
    const [allScore, setAllScore] = useState(-1);
    const [startDt, setStartDt] = useState(null);
    const [spentTime, setSpentTime] = useState(0);

    const handleOnStart = () => {
        onStart();
        setCurrentQuestionIndex(0);
        setIsStarting(true);
        setAllScore(0);
        setStartDt(performance.now());
    }

    const handleOnAnswer = (q_i, input_a_i) => {
        // 判定
        const correct_input = (questions[q_i].correct_answer === input_a_i)? true: false;

        onAnswer(q_i, input_a_i, correct_input?1:2);
        if (correct_input) {
            setAllScore(allScore + 1);
        }

        if (currentQuestionIndex >= questions.length-1) {
            // 終了
            //setCurrentQuestionIndex(-1);
            setIsStarting(false);
            onEndOfQuestions();

            // 時刻計測
            const endDt = performance.now();
            const tm_ms = endDt - startDt;
            setSpentTime(Math.round(tm_ms)/1000);
            return;
        }

        setCurrentQuestionIndex(currentQuestionIndex+1);
    }

    return (
        <>
            <div>
                <QuestionList
                    questions = {questions}
                    currentQuestionIndex = {currentQuestionIndex}
                />
                <div className="control_panel">
                    {((currentQuestionIndex<0) || !isStarting) &&
                        <button className="button-19" onClick={handleOnStart}>開始</button>
                    }
                    {(allScore>=0) && (!isStarting) &&
                        <table className="result_table">
                            <tbody>
                                <tr>
                                    <th>score</th>
                                    <td><span className="result_value">{allScore}</span> pt</td>
                                </tr>
                                <tr>
                                    <th>time</th>
                                    <td><span className="result_value">{spentTime}</span> s</td>
                                </tr>
                            </tbody>
                        </table>
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
                </div>
            </div>
        </>
    );
};

export default QuestionBox;
