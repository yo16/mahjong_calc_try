import {STR_MAP} from "./hai_const.js";

/* 適当に牌を組み合わせる */
/*
haisoは、メンツの配列
メンツは下記のdict
{
    type: ["head":頭, "body":メンツ]
    mentsuType: bodyのときのみ有効. ["shuntsu", "kohtsu", "kantsu"]
    naki: 鳴き [0:なし, 1:上家, 2:対面, 3:下家]
    hai: 純粋な牌の配列. GLの縦向きの値のみを使用して表現する.
    haiMj: majang-core形式の文字列. 並び方も持つ.
    haiGL:GL-Mahjong形式の文字列. 並び方も持つ.
}
majang-core形式の場合は、全体を正規化する必要がある
*/
export default function make_haiso() {
    let haiso = null;
    do {
        // 頭
        haiso = [{
            type: "head",
            naki: 0,
            ...getRandomHai(2)
        }];

        // body４つ
        for(let i=0; i<4; i++){
            const mentsu = getRandomMentsu();
            haiso.push({
                type: "body",
                ...mentsu,
            })
        }

    } while (!validateHaiso(haiso));  // 牌の数を数えて5つ以上使っていないことを確認

    // 上がり牌を決める
    const haiso_with_decide = set_agari_hai(haiso);
    
    return {
        haiso: haiso_with_decide,
        isRon: getRandomInt(2)===0 ? true : false,
    };
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomHai(hai_suu) {
    const h = getRandomInt(34);
    const color = (h<9)?"m"
        :(h<18)?"p"
        :(h<27)?"s"
        :"z";
    const num = h%9;
    const hai = STR_MAP.filter(
        (m)=>m.typeMark===color
    ).map((m)=>m.typeStr[num])[0];
    return {
        hai: hai.repeat(hai_suu),
        haiMj: color + (`${num+1}`.repeat(hai_suu)),    // majang-core形式
        haiGL: hai.repeat(hai_suu),                 // GL-Mahjong形式
    };
}

function getRandomMentsu() {
    // 鳴いていないか、上家、対面、下家から鳴いたかを選択
    const naki_rate_settings = [7,1,1,1];
    const naki_val = getRandomInt(naki_rate_settings[0]+naki_rate_settings[1]+naki_rate_settings[2]+naki_rate_settings[3]);
    let naki = 0;
    const naki_mark_def = "-=+";  // 上家、対面、下家の順
    let naki_mark = "";
    if (naki_val<naki_rate_settings[0]){
        naki = 0;
    } else {
        if (naki_val<naki_rate_settings[0]+naki_rate_settings[1]){
            // 上家
            naki = 1;
        } else if (naki_val<naki_rate_settings[0]+naki_rate_settings[1]+naki_rate_settings[2]){
            // 対面
            naki = 2;
        } else {
            // 下家
            naki = 3;
        }
        naki_mark = naki_mark_def.charAt(naki-1);
    }
    
    // 順子と刻子と槓子を選択
    const rate_settings = [3,3,1];
    const i = getRandomInt(rate_settings[0]+rate_settings[1]+rate_settings[2]);

    // 順子
    if (i<rate_settings[0]) {
        // 鳴くとしたら上家からのみ
        if (naki>=2){
            // 鳴かなかったことにする
            naki = 0;
            naki_mark = "";
        }

        // 色を0～2で決めて、開始位置を0～6を決めて、そこから順に3つ
        const color_int = getRandomInt(3);
        const color = "mspz".charAt(color_int);
        const start_num = getRandomInt(7);
        // 鳴いていたら鳴いた牌を決める
        let naki_pos = -1;
        if (naki>0){
            naki_pos = getRandomInt(3);
        }

        // 使っている牌
        const curTypeStr = STR_MAP.filter((m) => m.typeMark===color)[0].typeStr;
        let hai = curTypeStr.substring(start_num, start_num+3);

        // majang-core形式の文字列
        let haiMj = color;
        for (let i=0; i<3; i++){
            haiMj += (start_num+1+i);
            if (naki_pos===i){
                haiMj += naki_mark;
            }
        }

        // GL-Mahjong形式の文字列
        let haiGL = "";
        if (naki===0){
            haiGL = curTypeStr.substring(start_num, start_num+3);
        } else {
            haiGL = curTypeStr[9+start_num+naki_pos]
                + curTypeStr.substring(start_num, start_num+naki_pos)
                + curTypeStr.substring(start_num+naki_pos+1, start_num+3);
        }

        return {
            mentsuType:"shuntsu",
            color,
            hai,
            haiMj,
            haiGL,
            naki,
        };

    // 刻子
    } else if (i<rate_settings[0]+rate_settings[1]) {
        // 牌を決める
        const h = getRandomInt(34);
        const color = (h<9)?"m"
            :(h<18)?"p"
            :(h<27)?"s"
            :"z";
        const num = h%9;
        
        // 使っている牌
        const curTypeStr = STR_MAP.filter((m) => m.typeMark===color)[0].typeStr;
        const hai = curTypeStr.charAt(num).repeat(3);
        
        // majang-core形式の文字列
        const haiMj = color + `${num+1}`.repeat(3) + naki_mark;

        // GL-Mahjong形式の文字列
        let haiGL = "";
        if (naki===0) {
            haiGL = curTypeStr.charAt(num).repeat(3);
        } else {
            for (let i=0; i<3; i++) {
                haiGL += curTypeStr.charAt(((naki===i+1)?(color==="z"?7:9):0) + num);
            }
        }
        
        return {
            mentsuType:"kohtsu",
            hai,
            haiMj,
            haiGL,
            naki,
        };
    }

    // 槓子
    // 牌を決める
    const h = getRandomInt(34);
    const color = (h<9)?"m"
        :(h<18)?"p"
        :(h<27)?"s"
        :"z";
    const num = h%9;

    // 使っている牌
    const curTypeStr = STR_MAP.filter((m) => m.typeMark===color)[0].typeStr;
    const hai = curTypeStr.charAt(num).repeat(4);

    // majang-core形式の文字列
    const haiMj = color + `${num+1}`.repeat(4) + naki_mark;

    // GL-Mahjong形式の文字列
    let haiGL = "";
    if (naki===0) {
        haiGL = "9" + curTypeStr.charAt(num).repeat(2) + "9";
    } else {
        for (let i=0; i<4; i++) {
            if (i===(naki===3?3:naki-1)){
                haiGL += curTypeStr.charAt(9+num);
            } else {
                haiGL += curTypeStr.charAt(num);
            }
        }
    }

    return {
        mentsuType:"kantsu",
        hai,
        haiMj,
        haiGL,
        naki
    };
}

function validateHaiso(ary){
    return validateHaiStr(ary.map((e) => e.hai).join(""));
}

function validateHaiStr(s){
    /* 同じ文字が5回以上使われていたらfalse、そうでなければtrue */
    let cnt = {};
    for (let i=0; i<s.length; i++ ){
        if (s[i] in cnt) {
            cnt[s[i]] += 1;
            if (cnt[s[i]]>=5) {
                return false;
            }
        } else {
            cnt[s[i]] = 1;
        }
    }
    return true;
}

function set_agari_hai(haiso){
    const menzen_ments = haiso.filter((m)=>(
        (m.naki===0 && m.mentsuType!=="kantsu"))
    );
    const naki_mentsu = haiso.filter((m)=>(
        (m.naki!==0) ||
        (m.naki===0 && m.mentsuType==="kantsu")
    ));

    // 上がり牌を持つメンツを決定
    const menzen_mentsu_agri_i = getRandomInt(menzen_ments.length);

    // 上がり牌を決定
    const agari_hai_i = getRandomInt(menzen_ments[menzen_mentsu_agri_i].hai.length);
    
    // 上がり牌を持つメンツのhaiから上がり牌を除外し
    // 上がり牌を別に出す
    let ret_haiso = [...menzen_ments];
    const agari_mentsu = menzen_ments[menzen_mentsu_agri_i];
    ret_haiso[menzen_mentsu_agri_i] = {
        ...agari_mentsu,
        haiMj: agari_mentsu.haiMj.charAt(0) + 
            agari_mentsu.haiMj.substring(1,agari_hai_i+1) +     // Mjはcolorの１文字分右にずれる
            agari_mentsu.haiMj.substring(agari_hai_i+2),
        agariHaiMj: agari_mentsu.haiMj.charAt(0) + 
            agari_mentsu.haiMj.charAt(agari_hai_i+1),
        haiGL: agari_mentsu.hai.substring(0,agari_hai_i) + 
               agari_mentsu.hai.substring(agari_hai_i+1),
        agariHaiGL: agari_mentsu.hai.charAt(agari_hai_i),
    };

    return [
        ...ret_haiso,
        ...naki_mentsu,
    ];
}
