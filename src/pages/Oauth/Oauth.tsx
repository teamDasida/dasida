import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Oauth() {
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            
            try {
                const code = new URL(window.location.href).searchParams.get('code');
                const result = await axios.post(`${process.env.REACT_APP_SERVER_URL}auth`, { code });
                if (result) {
                    //   setAuthToken(result);
                    console.log(result);
                } else {
                    alert('로그인 실패');
                }
            } catch (error) {
                console.error('Error fetching auth token:', error);
                alert('인증 중 오류가 발생했습니다.');
            }
        };

        fetchData();
    }, [navigate]);

    return <></>;
}
