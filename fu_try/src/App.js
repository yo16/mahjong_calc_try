import { useState } from "react";
import make_haiso from "./utils/make_haiso";
import pretty_haiso from "./utils/pretty_haiso";

import "./App.css";

const App = () => {
    const [isRon, setIsRon] = useState(true);
    const [haiso, setHaiso] = useState("");

    function getRandomInt(max){
        return Math.floor(Math.random() * max);
    }
    function getRandomBool(){
        return getRandomInt(2)===0?false: true;
    }

    const handleClickMakingQ = () => {
        // 問題の牌姿を作る
        const haiso = make_haiso();
        setHaiso(pretty_haiso(haiso));

        setIsRon(getRandomBool());
    }

    return (
        <>
            <button onClick={handleClickMakingQ}>問題作成</button>
            <hr />
            <div>{isRon?"ロン":"ツモ"}</div>
            <div className="font-mahjong">{haiso}</div>
        </>
    );
};

export default App;
