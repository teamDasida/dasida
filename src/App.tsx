import { Outlet } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Outlet />;
        </>
    );
}

export default App;
