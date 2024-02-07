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
    },
    {
        url: "/fumentsu",
        text: "符 メンツ単独",
    },
    {
        url: "/fugokei",
        text: "符 手全体",
    },
    {
        url: "/totalscore",
        text: "トータルスコア",
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
                    <Route exact path="/" element={
                        <TopPage />
                    } />
                    <Route exact path="/totalscore" element={
                        <TotalScore />
                    } />
                    <Route path="/fumentsu" element={
                        <FuMentsu />
                    } />
                    <Route path="/fugokei" element={
                        <FuGokei />
                    } />
                    <Route path="*" element={
                        <PageNotFound />
                    } />
                </Routes>
            </main>
        </>
    );
};

export default App;
