import { useState } from "react";
import make_haiso from "./utils/make_haiso";
import pretty_haiso from "./utils/pretty_haiso";
import get_score from "./utils/get_score";

import "./App.css";

const App = () => {
    const [haiso, setHaiso] = useState("");
    const [baKaze, setBaKaze] = useState(0);    // 0:東, 1:南
    const [jiKaze, setJiKaze] = useState(0);    // 0:東, 1:南, 2:西, 3:北
    const [ronAgari, setRonAgari] = useState(true);

    const handleClickMakingQ = () => {
        // 風を決定
        const localBaKaze = getRandomInt(2);
        setBaKaze(localBaKaze);
        const localJiKaze = getRandomInt(4);
        setJiKaze(localJiKaze);

        // 問題の牌姿を作る
        const { haiso, isRon } = make_haiso();
        setHaiso(pretty_haiso(haiso));
        setRonAgari(isRon);

        // スコア計算
        const {fu} = get_score(haiso, localBaKaze, localJiKaze, isRon);

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
        </>
    );
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default App;
