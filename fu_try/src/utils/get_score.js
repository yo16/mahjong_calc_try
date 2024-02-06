import {Util, Shoupai, rule} from "@kobalab/majiang-core";

export default function get_score(haiso, baKaze, jiKaze, isRon){
    // haiMjを連結する
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

    // 上がり牌を得る
    const agariHaiMj = haiso
        .filter((one_haiso) => "agariHaiMj" in one_haiso)[0]
        .agariHaiMj
    ;
    console.log(`agari:${agariHaiMj}`);

    // Shoupaiインスタンスを作成
    let sp = new Shoupai();
    sp.fromString(sp_str);
    
    // 上がり状態を作る
    let rongPai = null;
    if (isRon){
        // ロンの場合はロン牌に設定
        // 上がった元を上家とする(計算には関係ない)
        rongPai = agariHaiMj + "-";
    } else {
        // ツモの場合はツモる
        sp.zimo(agariHaiMj);
    }
    console.log(`rongPai:${rongPai}:`);
    console.log(sp.toString());

    // 上がり状態のオプション
    const agari_option = {
        rule:           rule(),
        zhuangfeng:     baKaze,
        menfeng:        jiKaze,
        hupai: {    /* 状況役 */
            lizhi:      0,          /* リーチ なし */
            yifa:       false,      /* 一発 なし */
            qianggang:  false,      /* 槍槓 なし */
            lingshang:  false,      /* 嶺上開花 なし */
            haidi:      1,          /* ハイテイ なし */
            tianhu:     0           /* 天和/地和 なし */
        },
        baopai:         [ ],   /* ドラ表示牌 1万(符計算には無関係) */
        fubaopai:       null,       /* 裏ドラ表示牌 なし */
        jicun: {    /* 供託 */
            changbang:  0,          /* 点棒 なし */
            lizhibang:  0           /* リーチ棒 なし */
        },
    };

    // 点数計算
    const score = Util.hule(sp, rongPai, agari_option);
    console.log(score);

    //sp.zimo(agariHaiMj);
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
