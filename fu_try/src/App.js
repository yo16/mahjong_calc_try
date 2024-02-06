import { useState } from "react";
import make_haiso from "./utils/make_haiso";
import pretty_haiso from "./utils/pretty_haiso";

import "./App.css";

const App = () => {
    const [haiso, setHaiso] = useState("");
    const [baKaze, setBaKaze] = useState(0);    // 0:東, 1:南
    const [jiKaze, setJiKaze] = useState(0);    // 0:東, 1:南, 2:西, 3:北
    const [ronAgari, setRonAgari] = useState(true);
    const [score, setScore] = useState({});

    const handleClickMakingQ = () => {
        // 問題の牌姿を作る
        const { haiso, isRon, baKaze, jiKaze, score } = make_haiso();
        console.log(haiso);

        // 表示形式の文字列を作る
        setHaiso(pretty_haiso(haiso));

        // stateを変更
        setJiKaze(jiKaze);
        setBaKaze(baKaze);
        setRonAgari(isRon);
        setScore(score);
    }

    // 風
    const baKaze_str = baKaze===0 ? "東"
        : baKaze===1 ? "南"
        : baKaze===2 ? "西"
        : "北";
    const jiKaze_str = jiKaze===0 ? "東"
        : jiKaze===1 ? "南"
        : baKaze===2 ? "西"
        : "北";

    return (
        <>
            <button onClick={handleClickMakingQ}>問題作成</button>
            <hr />
            <div>場風: {haiso===""?"":baKaze_str}</div>
            <div>自風: {haiso===""?"":jiKaze_str}</div>
            <div>{haiso===""?"":ronAgari?"ロン":"ツモ"}</div>
            <div className="font-mahjong">{haiso}</div>
            <hr />
            <div>{score.fu}符</div>
            <div>{score.fanshu}翻</div>
            <div>{score.defen}点</div>
            <div>{score.hupai?score.hupai.map((h)=><>{h.name}<br /></>):""}</div>
        </>
    );
};

export default App;
