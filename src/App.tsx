import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/main')
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Outlet />;
        </>
    );
}

export default App;
