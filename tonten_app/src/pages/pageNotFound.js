import { useLocation } from "react-router-dom";

const PageNotFound = () => {
    const location = useLocation();
    
    return (
        <>
            <div>
                <h1>Page not found.(404)</h1>
                { location.pathname } is not existed.
            </div>
        </>
    );
}

export default PageNotFound;
