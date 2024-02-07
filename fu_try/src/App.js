import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import TotalScore from "./TotalScore";
import FuMentsu from "./pages/fuMentsu";
import PageNotFound from "./pages/pageNotFound";

const App = () => {
    

    return (
        <BrowserRouter>
            <div className="header">
                headerです.<Link to="/">TotalScore</Link>, <Link to="/fumentsu">FuMentsu</Link>
            </div>
            <div className="contents">
                <Routes>
                    <Route exact path="/" element={
                        <TotalScore />
                    } />
                    <Route path="/fumentsu" element={
                        <FuMentsu />
                    } />
                    <Route path="*" element={
                        <PageNotFound />
                    } />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
