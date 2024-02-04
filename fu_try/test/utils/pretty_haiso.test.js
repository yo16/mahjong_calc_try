import {sort_str, get_rotated_str} from "@/src/utils/pretty_haiso.js";

// 参考
// const ALL_HAI = "qwertyuioasdfghjklzxcvbnm,.1234567";
//                //マンズ   ソウズ   ピンズ   字

describe("sort_str", () => {
    test("1", () => {
        expect(
            sort_str("qwqw")
        ).toBe("qqww");
    });

    test("2", () => {
        expect(
            sort_str("qwertyuioasdfghjklzxcvbnm,.1234567qwertyuioasdfghjklzxcvbnm,.1234567")
        ).toBe("qqwweerrttyyuuiiooaassddffgghhjjkkllzzxxccvvbbnnmm,,..11223344556677");
    });
});

describe("get_rotated_str", () => {
    test("1", () => {
        expect(
            get_rotated_str("q")
        ).toBe("Q");
    });
    test("2", () => {
        expect(
            get_rotated_str("2")
        ).toBe("\"");
    });

    test("1-inverse", () => {
        expect(
            get_rotated_str("Q")
        ).toBe("q");
    });
    test("2-inverse", () => {
        expect(
            get_rotated_str("\"")
        ).toBe("2");
    });

    test("not used", () => {
        expect(
            get_rotated_str("p")
        ).toBe("p");
    });
});
