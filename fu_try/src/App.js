import { useState } from "react";

import "./App.css";

const App = () => {
    const [isMenzen, setIsMenzen] = useState(true);
    const [isRon, setIsRon] = useState(true);

    function getRandomInt(max){
        return Math.floor(Math.random() * max);
    }
    function getRandomBool(){
        return getRandomInt(2)===0?false: true;
    }

    const handleClickMakingQ = () => {
        setIsMenzen(getRandomBool());
        setIsRon(getRandomBool());
    }

    return (
        <>
            <button onClick={handleClickMakingQ}>問題作成</button>
            <hr />
            <div>{isMenzen?"メンゼン":"フーロ"}</div>
            <div>{isRon?"ロン":"ツモ"}</div>
            <div className="font-mahjong">qqyyasdm,. 9119 y</div>
        </>
    );
};

export default App;
