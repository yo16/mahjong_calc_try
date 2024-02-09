import { IoMdCloseCircle } from "react-icons/io";
import { FaRegThumbsUp } from "react-icons/fa6";

import HaiStr from "./haiStr";

import "./questionLine.css";

const QuestionLine = ({
    question = "",
    answer = "",
    result = 0,     // [0:未回答, 1:正解, 2:不正解]
    qSeq = 0,       // ゼロベース
    qCount = 0,
    display = false,
    isCurrentQ = true,
}) => {
    // 基本のクラスと、isCurrentQのスタイル
    let class_name = ["one_ql"];
    if (isCurrentQ) {
        class_name.push("is_current_q");
    }
    if (result===2) {
        class_name.push("wrong_answer");
    }

    // 表示のON/OFF切り替え用
    const style = {
        display: (display) ? "" : "none",
    };

    return (
        <>
            <div className={class_name.join(" ")} style={style}>
                <div className="line_seq">{qSeq+1}/<span className="total_seq">{qCount}</span></div>
                <div className="hai_str"><HaiStr>{question}</HaiStr></div>
                <div className="answer_result_mark">{(result===0)?"":(result===1)?
                    <FaRegThumbsUp color="#aaaacc" />:
                    <IoMdCloseCircle color="#ee6666" />
                }</div>
                <div className="answer_correct">{(result===0)?"":answer}</div>
            </div>
        </>
    );
};

export default QuestionLine;
