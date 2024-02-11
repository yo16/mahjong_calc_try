import { Link, Routes, Route } from "react-router-dom";

import TopPage from "./pages/topPage";
import TotalScore from "./pages/totalScore";
import FuMentsu from "./pages/fuMentsu";
import FuGokei from "./pages/fuGokei";
import PageNotFound from "./pages/pageNotFound";

import "./App.css";

const SITE_PAGES = [
    {
        url: "/",
        text: "トップページ",
        elm: <TopPage />,
    },
    {
        url: "/fumentsu",
        text: "符１メンツ",
        elm: <FuMentsu />,
    },
    {
        url: "/fugokei",
        text: "符全体",
        elm: <FuGokei />,
    },
    {
        url: "/screcalc",
        text: "符ｘ翻",
        elm: <TotalScore />,
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
            <header className="flex flex-row items-center px-5 main_header">
                <img src="ton.png" alt="site icon" />
                {
                    SITE_PAGES.map((p,i) => <Link to={p.url} key={`header_${i}`} className="p-3">{p.text}</Link>)
                }
            </header>
            <main className="main_contents">
                <Routes>
                    {
                        SITE_PAGES.map((p,i) => 
                            <Route path={p.url} element={p.elm} key={`route_${i}`} />
                        )
                    }
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
