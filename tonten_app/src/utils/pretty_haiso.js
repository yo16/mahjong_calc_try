
const ALL_HAI         = "qwertyuiozxcvbnm,.asdfghjkl1234567";
const ALL_HAI_ROTATED = "QWERTYUIOZXCVBNM<>ASDFGHJKL!\"#$%&'";
                       //マンズ   ピンズ   ソウズ   字

// haiso情報をきれいにした形で返す
export default function pretty_haiso(haiso) {
    // 上がり牌
    const agariHai = haiso.map((m)=>{
        if ("agariHaiGL" in m) {
            return m.agariHaiGL;
        } else {
            return "";
        }
    }).join("");

    let pretty_str = `${agariHai} `;

    // カン以外の面前のみ
    const menzen_mentsu = haiso.filter((one_haiso) => (
        (one_haiso.naki === 0) &&
        (one_haiso.mentsuType !== "kantsu")
    ));
    // 鳴きとカンのみ
    const naki_mentsu = haiso.filter((one_haiso) => (
        (one_haiso.naki !== 0) ||
        (
            (one_haiso.naki === 0) &&
            (one_haiso.mentsuType === "kantsu")
        )
    ));
    //console.log(menzen_mentsu);
    //console.log(naki_mentsu);
    const menzen_mentsu_str = menzen_mentsu
        .map((one_haiso) => one_haiso.haiGL)
        .join("")
    ;
    
    // 面前のみをソート
    pretty_str += " " + sort_str(menzen_mentsu_str);

    pretty_str += " " + naki_mentsu
        .map((one_haiso) => one_haiso.haiGL)
        .join(" ");


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
