
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
        console.log(haiso);

    } while (!validateHaiso(haiso));  // 牌の数を数えて5つ以上使っていないことを確認
    
    return haiso;
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
    const naki = getRandomInt(naki_rate_settings[0]+naki_rate_settings[1]+naki_rate_settings[2]+naki_rate_settings[3]);
    
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
