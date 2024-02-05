
const ALL_HAI = "1234567qwertyuioasdfghjklzxcvbnm,.";
               //0123456789012345678901234567890123
               //字     マンズ   ソウズ   ピンズ

export default function make_haiso() {
    /* 適当に牌を組み合わせる */
    let haiso = null;
    do {
        // 頭
        haiso = [{type:"head", hai:getRandomHai().repeat(2)}];

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

function getRandomHai() {
    return ALL_HAI[getRandomInt(ALL_HAI.length)];
}

function getRandomMentsu() {
    // 鳴いていないか、上家、対面、下家から鳴いたかを選択
    const naki_rate_settings = [6,1,1,1];
    const naki_val = getRandomInt(naki_rate_settings[0]+naki_rate_settings[1]+naki_rate_settings[2]+naki_rate_settings[3]);
    let naki = 0;
    if (naki_val<naki_rate_settings[0]){
        naki = 0;
    } else if (naki_val<naki_rate_settings[0]+naki_rate_settings[1]){
        naki = 1;
    } else if (naki_val<naki_rate_settings[0]+naki_rate_settings[1]+naki_rate_settings[2]){
        naki = 2;
    } else {
        naki = 3;
    }
    
    // 順子と刻子と槓子を選択
    const rate_settings = [3,3,1];
    const i = getRandomInt(rate_settings[0]+rate_settings[1]+rate_settings[2]);

    // 順子
    if (i<rate_settings[0]) {
        // 色を0～2で決めて、開始位置を0～6を決めて、そこから順に3つ
        const color = getRandomInt(3);
        //console.log("色:"+color);
        const start_num = getRandomInt(7);
        //console.log("開始:"+start_num);
        const startPos = 7 + 9*color + start_num;
        const ret = ALL_HAI.slice(startPos, startPos+3);
        //console.log("文字列:"+ret);
        return {mentsuType:"shuntsu", hai:ret, naki};

    // 刻子
    } else if (i<rate_settings[0]+rate_settings[1]) {
        // 開始位置を0～length-1で決めて、それを3つ
        const pos = getRandomInt(ALL_HAI.length);
        return {mentsuType:"kohtsu", hai:ALL_HAI[pos].repeat(3), naki};
    }

    // 槓子
    // 開始位置を0～length-1で決めて、それを4つ
    const pos = getRandomInt(ALL_HAI.length);
    return {mentsuType:"kantsu", hai:ALL_HAI[pos].repeat(4), naki};
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
        (m.type==="head") ||
        (m.type==="body" && m.naki===0 && m.mentsuType!=="kantsu"))
    );
    const naki_mentsu = haiso.filter((m)=>(
        (m.type==="body" && m.naki===0 && m.mentsuType==="kantsu") ||
        (m.type==="body" && m.naki!==0)
    ));

    // 上がり牌を持つメンツを決定
    const menzen_mentsu_agri_i = getRandomInt(menzen_ments.length);

    // 上がり牌を決定
    const agari_hai_i = getRandomInt(menzen_ments[menzen_mentsu_agri_i].hai.length);
    
    // 上がり牌を持つメンツのhaiから上がり牌を除外し
    // 上がり牌を別に出す
    let ret_haiso = [...menzen_ments];
    ret_haiso[menzen_mentsu_agri_i] = {
        ...menzen_ments[menzen_mentsu_agri_i],
        hai: menzen_ments[menzen_mentsu_agri_i].hai.substring(0,agari_hai_i) + 
             menzen_ments[menzen_mentsu_agri_i].hai.substring(agari_hai_i+1),
        agariHai: menzen_ments[menzen_mentsu_agri_i].hai.charAt(agari_hai_i),
    };

    return [
        ...ret_haiso,
        ...naki_mentsu,
    ];
}
