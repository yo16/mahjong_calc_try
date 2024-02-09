/* /pages/fuMentsu.js */
/*
１メンツをランダムで出して、
その符を当てる練習
*/
import { useState } from "react";
import HaiStr from "../components/haiStr";
import QuestionBox from "../components/questionBox";
import { getRandomMentsu } from "../utils/make_haiso";

import "./fuMentsu.css";

const FuMentsu = () => {
    const [questions, setQuestions] = useState([]);

    // 問題を作る
    const createQuestions = () => {
        let qs = [];
        for (let i=0; i<10; i++) {
            const mnt = getRandomMentsu([0,1,1]);
            const correct_answer = [2,4,8,16,32].indexOf(mnt.fu);

            qs.push({
                question: mnt.haiGL,
                answers: ["2符","4符","8符","16符","32符"],
                correct_answer,
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
            <div className="questions_title">１メンツの符を選択してください！</div>
            <QuestionBox
                questions={questions}
                onStart={handleOnStart}
                onAnswer={handleOnAnswer}
                onEndOfQuestions={handleOnEndOfQuestions}
            />
            <hr />
            <table>
                <tbody>
                    <tr>
                        <td className="hintHead"></td>
                        <td className="hintHead"><HaiStr fontSize="M" textAlign="center">sk</HaiStr></td>
                        <td className="hintHead"><HaiStr fontSize="M" textAlign="center">a1</HaiStr></td>
                    </tr>
                    <tr>
                        <td className="hintHead"><HaiStr fontSize="M" textAlign="center">aAa</HaiStr></td>
                        <td>2符</td>
                        <td>4符</td>
                    </tr>
                    <tr>
                        <td className="hintHead"><HaiStr fontSize="M" textAlign="center">aaa</HaiStr></td>
                        <td>4符</td>
                        <td>8符</td>
                    </tr>
                    <tr>
                        <td className="hintHead"><HaiStr fontSize="M" textAlign="center">aaAa</HaiStr></td>
                        <td>8符</td>
                        <td>16符</td>
                    </tr>
                    <tr>
                        <td className="hintHead"><HaiStr fontSize="M" textAlign="center">9aa9</HaiStr></td>
                        <td>16符</td>
                        <td>32符</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};



export default FuMentsu;
