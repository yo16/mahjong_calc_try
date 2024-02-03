import fu_calc from "@/src/utils/fu_calc.js";

describe("門前", () => {
    test("28アンコ(4)+ツモ(2)=26=>30", () => {
        expect(
            fu_calc({
                isFuro: false,
                isRon: false,
                mentsu28Anko: 1,
            })
        ).toBe(30);
    });
    test("28アンカン(16)+ツモ(2)=38=>40", () => {
        expect(
            fu_calc({
                isFuro: false,
                isRon: false,
                mentsu28Ankan: 1,
            })
        ).toBe(40);
    });
    test("28アンカン(16)+頭(2)+ツモ(2)=40=>40", () => {
        expect(
            fu_calc({
                isFuro: false,
                isRon: false,
                hasYakuAtama: true,
                mentsu28Ankan: 1,
            })
        ).toBe(40);
    });
    test("19アンコ(8)+ツモ(2)=30=>30", () => {
        expect(
            fu_calc({
                isFuro: false,
                isRon: false,
                mentsu19Anko: 1,
            })
        ).toBe(30);
    });
    test("19アンカン(32)+ツモ(2)=54=>60", () => {
        expect(
            fu_calc({
                isFuro: false,
                isRon: false,
                mentsu19Ankan: 1,
            })
        ).toBe(60);
    });
    test("19アンカン(32)+28アンコ(4)+頭(2)+ツモ(2)=60=>60", () => {
        expect(
            fu_calc({
                isFuro: false,
                isRon: false,
                hasYakuAtama: true,
                mentsu19Ankan: 1,
                mentsu28Anko: 1,
            })
        ).toBe(60);
    });
    test("19アンカン(32)+28アンコx2(8)+ツモ(2)=62=>70", () => {
        expect(
            fu_calc({
                isFuro: false,
                isRon: false,
                mentsu19Ankan: 1,
                mentsu28Anko: 2,
            })
        ).toBe(70);
    });
    test("19アンカン(32)+28アンコx2(4x2)=60=>60", () => {
        expect(
            fu_calc({
                isFuro: false,
                isRon: true,
                mentsu19Ankan: 1,
                mentsu28Anko: 2,
            })
        ).toBe(70);
    });
});

describe("鳴き", () => {
    test("鳴いてロン、28アンコ(4)=24=>30", () => {
        expect(
            fu_calc({
                isFuro: true,
                isRon: true,
                mentsu28Anko: 1,
            })
        ).toBe(30);
    });
    test("鳴いてロン、28アンコx2(4x2)、頭(2)=30=>30", () => {
        expect(
            fu_calc({
                isFuro: true,
                isRon: true,
                mentsu28Anko: 2,
                hasYakuAtama: true,
            })
        ).toBe(30);
    });
    test("鳴いてツモ、28アンコx2(4x2)、頭(2)、ツモ(2)=32=>40", () => {
        expect(
            fu_calc({
                isFuro: true,
                isRon: false,
                mentsu28Anko: 2,
                hasYakuAtama: true,
            })
        ).toBe(40);
    });
    test("鳴いてロン、28アンコx3(4x3)=32=>40", () => {
        expect(
            fu_calc({
                isFuro: true,
                isRon: true,
                mentsu28Anko: 3,
            })
        ).toBe(40);
    });

});

describe("ピンフ型", () => {
    test("門前ピンフツモ", () => {
        expect(
            fu_calc({
                isFuro: false,
                isRon: false,
            })
        ).toBe(20);
    });

    test("門前ピンフロン", () => {
        expect(
            fu_calc({
                isFuro: false,
                isRon: true,
            })
        ).toBe(30);
    });

    test("鳴いてピンフ ツモ", () => {
        expect(
            fu_calc({
                isFuro: true,
                isRon: false,
            })
        ).toBe(30);
    });

    test("鳴いてピンフ ロン", () => {
        expect(
            fu_calc({
                isFuro: true,
                isRon: true,
            })
        ).toBe(30);
    });
});
