import { Link, Routes, Route } from "react-router-dom";

import TopPage from "./pages/topPage";
import TotalScore from "./pages/totalScore";
import FuMentsu from "./pages/fuMentsu";
import FuGokei from "./pages/fuGokei";
import PageNotFound from "./pages/pageNotFound";

const SITE_PAGES = [
    {
        url: "/",
        text: "トップページ",
        elm: <TopPage />,
    },
    {
        url: "/fumentsu",
        text: "符 メンツ単独",
        elm: <FuMentsu />,
    },
    {
        url: "/fugokei",
        text: "符 手全体",
        elm: <FuGokei />,
    },
    {
        url: "/totalscore",
        text: "トータルスコア",
        elm: <TotalScore />,
    },
];

const App = () => {
    return (
        <>
            <header>
                {
                    SITE_PAGES.map((p,i)=> <><Link to={p.url} key={`header_${i}`}>{p.text}</Link>｜</>)
                }
            </header>
            <main className="contents">
                <Routes>
                    {
                        SITE_PAGES.map((p,i) => 
                            <Route path={p.url} element={p.elm} key={`route_${i}`} />
                        )
                    }

                </Routes>
            </main>
        </>
    );
};

export default App;
