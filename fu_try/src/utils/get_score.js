import {hule, Shoupai} from "@kobalab/majiang-core";
import {STR_MAP} from "./hai_const.js";

export default function get_score(haiso, baKaze, jiKaze, isRon){
    // haisoをmajang-core形式に変換
    // 上がり牌を除いて、haiMjを連結する
    const menzen_mentsu = haiso.filter((one_haiso) => (
        (one_haiso.naki === 0) &&
        (one_haiso.mentsuType !== "kantsu")
    ));
    const naki_mentsu = haiso.filter((one_haiso) => (
        (one_haiso.naki !== 0) ||
        (
            (one_haiso.naki === 0) &&
            (one_haiso.mentsuType === "kantsu")
        )
    ));
    let sp_str = menzen_mentsu
        .map((one_haiso) => one_haiso.haiMj)
        .join("")
    ;
    sp_str += "," + naki_mentsu
        .map((one_haiso) => one_haiso.haiMj)
        .join(",")
    ;



    /*
    const separeted_haiso = [...haiso.map((h)=>{
        const separated_one_haiso = [...h.hai].map((hai)=>{
            const curMap = STR_MAP.filter((map) => map.typeStr.indexOf(hai)>=0)[0];
            const color = curMap.typeMark;
            const num = curMap.typeStr.indexOf(hai) + 1;

            return `${color}${num}`;
        });
        return separated_one_haiso;
    })];
    //const haiso_hai_ary = separeted_haiso.flat();
    //const haiso_hai_ary = ['p9', 'p9', 'p1', 'p2', 'p3', 's1', 's2', 'p4', 'p5', 'p6', 'z3', 'z3', 'z3'];
    const haiso_hai_ary = ['p9', 'p9', 'p1', 'p2', 'p3', 's1', 's2', 'p4', 'p5', 'p6', 'z3', 'z3', 'z3'];
    //console.log(haiso_hai_ary);
    //let sp = new Shoupai(haiso_hai_ary);
    //let sp = new Shoupai(haiso.map((h)=>h.haiMj).join(""));
    let sp = new Shoupai();
    sp.fromString("p123999z11s12p555");
    */
    /*
    haiso_hai_ary.forEach((h) => {
        console.log(h);
        sp = sp.zimo(h);
    })
    */
    //sp.zimo()
    let sp = new Shoupai();
    sp.fromString(sp_str);
    //sp.fromString("p999p123p11p12,p555+");
    //sp.fulou("p555+");
    console.log(sp.toString());

    /*
    // 文字列をmajang-core形式に変換
    const mc_str = toMajangCore(haiso, isRon);

    // 手配の
    const sp = Shoupai(mc_str);
    */


    return {fu:1};
}

// haiso形式を、majiang-core形式へ変換する
// ロンの場合
// https://github.com/kobalab/majiang-core/wiki/Majiang.Util
// https://github.com/kobalab/majiang-core/wiki/Majiang.Shoupai

function toMajangCore(haiso, isRon){
    
};
