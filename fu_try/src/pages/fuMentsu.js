/* /pages/fuMentsu.js */
/*
１メンツをランダムで出して、
その符を当てる練習
*/
import { useState } from "react";
import HaiStr from "../components/haiStr";
import { getRandomMentsu } from "../utils/make_haiso";

import "./fuMentsu.css";

const FuMentsu = () => {
    const [haiStr, setHaiStr] = useState("");

    const handleStart = () => {
        // メンツを決める
        const mentsu = getRandomMentsu([0,1,1]);
        setHaiStr(mentsu.haiGL);
    }

    return (
        <>
            符を当ててください！<button onClick={handleStart}>開始</button>
            <hr />
            <HaiStr>{haiStr}</HaiStr>
            <div>
                <button className="button-19">2符</button>
                <button className="button-19">4符</button>
                <button className="button-19">8符</button>
                <button className="button-19">16符</button>
                <button className="button-19">32符</button>
            </div>
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
