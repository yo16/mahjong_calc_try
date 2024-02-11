
import QuestionLine from "./questionLine";

import "./questionList.css";

const QuestionList = ({
    questions = [],
    currentQuestionIndex = -1,
}) => {
    // 表示用に反転
    const reverseQ = [...questions].reverse();

    return (
        <>
            <div className="qlist-container">
                {
                    reverseQ.map((q, reverse_i) => {
                        // questionsに対するindexがi
                        const i = questions.length - reverse_i - 1;

                        // 逆順で並べる
                        return (
                            <QuestionLine
                                question = {q.question}
                                answer = {q.answers[q.correct_answer]}
                                result = {q.result}
                                qSeq = {i}
                                qCount = {questions.length}
                                display = {(i<=currentQuestionIndex)?true: false}
                                isCurrentQ = {(i===currentQuestionIndex)}
                                key = {`ql_${i}`}
                            />
                        );
                    })
                }
            </div>
        </>
    );
};

export default QuestionList;
