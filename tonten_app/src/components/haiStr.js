/* /utils/haiStr.js */
/*
font-mahjongクラスを使った牌の文字列。
text_i文字目に、コメントを入れられる。
スペースは、font-mahjongでなく、通常のフォント。（幅が小さい）
font_sizeは、S/M/L。
*/

const HaiStr = ({children, text="", textPos=0, fontSize="L", textAlign="left"}) => {
    // 文字列をバラす
    const str_ary = [...children];

    // フォントサイズ
    const font_size_class = " " + (
        (fontSize==="S") ? "font-mahjong-size-s":
        (fontSize==="M") ? "font-mahjong-size-m":
        "font-mahjong-size-l"
    );

    // align
    const text_align_class = " " + (
        (textAlign==="center") ? "justify-center":
        (textAlign==="right") ? "justify-end":
        "justify-start"
    );

    return (
        <div className={"flex flex-row items-end" + text_align_class}>
            {str_ary.map((c,i) => {
                const cur_text = (i===textPos) ? text : null;
                const cur_className = (c===" ") ?
                    "w-3" :
                    "font-mahjong" + font_size_class;
                return (
                    <div className="flex flex-col" key={`hai_c_${i}`}>
                        <div className="text-center">{ cur_text }</div>
                        <div className={cur_className}>{c}</div>
                    </div>
                );
            })}

        </div>
    );
};

export default HaiStr;
