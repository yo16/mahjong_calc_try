
const ALL_HAI         = "qwertyuioasdfghjklzxcvbnm,.1234567";
                       //マンズ   ソウズ   ピンズ   字
const ALL_HAI_ROTATED = "QWERTYUIOASDFGHJKLZXCVBNM<>!\"#$%&'";

// haiso情報をきれいにした形で返す
export default function pretty_haiso(haiso) {
    // 上がり牌
    const agariHai = haiso.map((m)=>{
        if ("agariHai" in m) {
            return m.agariHai;
        } else {
            return "";
        }
    }).join("");

    let pretty_str = `${agariHai} `;

    // 頭
    const atama = haiso.filter((h) => h.type==="head")[0];
    const atama_pretty = {...atama, pretty_str:atama.hai};
    // 暗カン以外の門前のみ
    const menzen_mentsu = haiso.filter((h)=>(
        (h.type==="body") && (h.naki===0) && (h.mentsuType!=="kantsu")
    )).map((h) => {
        return {
            ...h,
            pretty_str: h.hai,
        };
    });
    //let menzen_mentsu_pretty = [...menzen_mentsu];
    // 頭＋門前のpretty
    const menzen_str = atama_pretty.pretty_str + menzen_mentsu.map((h)=>h.pretty_str).join("");
    pretty_str += sort_str(menzen_str);

    // 暗カン
    const menzen_kan_mentsu = haiso.filter((h)=>(
        (h.type==="body") && (h.naki===0) && (h.mentsuType==="kantsu")
    )).map((h) => {
        return {
            ...h,
            pretty_str: "9"+h.hai.substr(0,2)+"9",
        }
    });
    //menzen_mentsu_pretty = menzen_mentsu_pretty.concat([...menzen_kan_mentsu]);
    // 暗カンのpretty
    pretty_str += " " + menzen_kan_mentsu.map((h) => h.pretty_str).join(" ");

    // 鳴き
    const naki_mentsu = haiso.filter((h)=>(
        (h.type==="body") && (h.naki!==0)
    ));
    const naki_mentsu_pretty = naki_mentsu.map((h) => {
        return {
            ...h,
            pretty_str: h.naki===1 ? 
                get_rotated_str(h.hai[0]) + h.hai.substring(1)
                :h.naki===2 ?
                    h.hai[0] + get_rotated_str(h.hai[1]) + h.hai.substring(2)
                    :h.hai.substring(0,h.hai.length-1) + get_rotated_str(h.hai[h.hai.length-1])
        }
    });
    pretty_str += " " + naki_mentsu_pretty.map((h) => h.pretty_str).join(" ");

    return pretty_str;
}

export function sort_str(s){
    let cnt = {};
    for (let i=0; i<s.length; i++ ){
        if (s[i] in cnt) {
            cnt[s[i]] += 1;
        } else {
            cnt[s[i]] = 1;
        }
    }

    let sorted_str = "";
    for (let i=0; i<ALL_HAI.length; i++ ){
        if (ALL_HAI[i] in cnt) {
            sorted_str += ALL_HAI[i].repeat(cnt[ALL_HAI[i]]);
        }
    }

    return sorted_str;
}

export function get_rotated_str(c){
    const i = ALL_HAI.indexOf(c);
    if ( i>=0 ) {
        return ALL_HAI_ROTATED[i];
    } else {
        const j = ALL_HAI_ROTATED.indexOf(c);
        if ( j>=0 ) {
            return ALL_HAI[j];
        }
    }
    return c;
}
