/* /pages/fuGokei.js */
/*
１揃いの手をランダムで出して、
その符を当てる練習
*/
import { useState } from "react";
import QuestionBox from "../components/questionBox";
import make_haiso from "../utils/make_haiso";
import pretty_haiso from "../utils/pretty_haiso";

import "./fuGokei.css";

const FuGokei = () => {
    const [questions, setQuestions] = useState([]);

    // 問題を作る
    const createQuestions = () => {
        let qs = [];
        for (let i=0; i<10; i++) {
            const {haiso} = make_haiso();
            console.log(haiso);
            qs.push({
                question: pretty_haiso(haiso),
                answers: ["2符","4符","8符","16符","32符"],
                correct_answer: 1,
                result: 0,      /* 0:未回答, 1:正解, -1:不正解 */
            });
        }
        setQuestions(qs);
    };

    // 開始
    const handleOnStart = () => {
        console.log("start!!!");
        createQuestions();
    }

    // １つ回答
    const handleOnAnswer = (q_i, input_a_i, result) => {
        console.log(`answer!!!!:${q_i},${input_a_i}, ${result}`);
        const cur_q = questions[q_i];

        // result 設定
        const newQuestions = [
            ...questions.slice(0, q_i),
            {
                ...cur_q,
                result,
                aa: "ccc",
            },
            ...questions.slice(q_i+1),
        ];
        setQuestions(newQuestions);
    };

    // 全部終了
    const handleOnEndOfQuestions = () => {
        console.log("handleOnEndOfQuestions");
    }

    return (
        <>
            <div className="questions_title">手全体の符を選択してください！</div>
            <QuestionBox
                questions={questions}
                onStart={handleOnStart}
                onAnswer={handleOnAnswer}
                onEndOfQuestions={handleOnEndOfQuestions}
            />
            <hr />
        </>
    );
};

export default FuGokei;
