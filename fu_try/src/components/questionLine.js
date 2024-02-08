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
    let style = {
        display: (display) ? "" : "none",
    };
    if (isCurrentQ) {
        style = {
            ...style,
            color: "#f00",
        }
    }

    return (
        <>
            <div className="one_ql" style={style}>
                <div>{qSeq+1}/<span>{qCount}</span></div>
                <div><HaiStr>{question}</HaiStr></div>
                <div>{(result===0)?"":(result===1)?"〇":"×"}</div>
                <div>{(result===0)?"":answer}</div>
            </div>
        </>
    );
};

export default QuestionLine;
