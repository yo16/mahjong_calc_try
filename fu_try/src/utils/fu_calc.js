/* utills/fu_calc.js */

export default function fu_calc({
    isMenzen = true,        /* 鳴いている:false, 鳴いていない:true */
    isRon = true,           /* ロン上がり:true, ツモ上がり:false */
    mentsu28Minko = 0,      /* 2-8の明刻の数 */
    mentsu28Anko = 0,       /* 2-8の暗刻の数 */
    mentsu28Minkan = 0,     /* 2-8の明槓の数 */
    mentsu28Ankan = 0,      /* 2-8の暗槓の数 */
    mentsu19Minko = 0,      /* 19字牌の明刻の数 */
    mentsu19Anko = 0,       /* 19字牌の暗刻の数 */
    mentsu19Minkan = 0,     /* 19字牌の明槓の数 */
    mentsu19Ankan = 0,      /* 19字牌の暗槓の数 */
    hasYakuAtama = false,   /* 頭は役牌かどうか */
    isTankiMachi = false    /* 1枚の上がりかどうか */
}){
    let fu_sum = 20;

    // ピンフ型の判定
    // 型のみの判定で、上がり方はここでは調べない
    let isPinfu = false;
    if ((
            mentsu28Minko + mentsu28Anko + mentsu28Minkan + mentsu28Ankan + 
            mentsu19Minko + mentsu19Anko + mentsu19Minkan + mentsu19Ankan
            === 0
        ) &&
        !hasYakuAtama && !isTankiMachi
    ) {
        // ピンフ
        isPinfu = true;
    }
    
    // 例外:ピンフの場合はここで確定
    if (isPinfu) {
        if (isMenzen && !isRon) {
            // ピンフツモの役の場合（=ピンフ型+門前ツモ）は20符
            return 20;
        }
        // 上記以外は30符
        return 30;
    }

    // 上がり方
    // 副露ロン:0, 門前ロン:10, ツモ:2
    if (!isMenzen){
        if (!isRon){
            // (副露)ツモ
            fu_sum += 2;
        }
    } else {
        if (isRon){
            // 門前ロン
            fu_sum += 10;
        } else {
            // (門前)ツモ
            fu_sum += 2;
        }
    }

    // メンツ
    fu_sum += mentsu28Minko * 2;
    fu_sum += mentsu28Anko * 4;
    fu_sum += mentsu28Minkan * 8;
    fu_sum += mentsu28Ankan * 16;
    fu_sum += mentsu19Minko * 4;
    fu_sum += mentsu19Anko * 8;
    fu_sum += mentsu19Minkan * 16;
    fu_sum += mentsu19Ankan * 32;

    // アタマ
    if (hasYakuAtama) {
        fu_sum += 2;
    }

    // 待ち
    if (isTankiMachi) {
        fu_sum += 2;
    }

    // 10の位を切り上げ
    const fu_result = Math.ceil(fu_sum/10) * 10;

    return fu_result;
}

