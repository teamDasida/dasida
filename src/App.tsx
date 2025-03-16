import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';

function App() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return <Outlet />;
}

export default App;
