import { useState } from "react";
import make_haiso from "./utils/make_haiso";
import pretty_haiso from "./utils/pretty_haiso";

import "./App.css";

const App = () => {
    const [ronAgari, setRonAgar] = useState(true);
    const [haiso, setHaiso] = useState("");

    const handleClickMakingQ = () => {
        // 問題の牌姿を作る
        const { haiso, isRon } = make_haiso();
        setHaiso(pretty_haiso(haiso));
        setRonAgar(isRon);
    }

    return (
        <>
            <button onClick={handleClickMakingQ}>問題作成</button>
            <hr />
            <div>{haiso===""?"":ronAgari?"ロン":"ツモ"}</div>
            <div className="font-mahjong">{haiso}</div>
        </>
    );
};

export default App;
