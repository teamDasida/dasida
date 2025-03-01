import { MainContainer } from '../../style/GlobalStyle';
import { IntroContainer } from './styles';
import Header from '../../components/Header/Header';

export default function Main() {
    // const { data, isLoading, isError, refetch } = useResource<boolean>(``, ['res']);

    return (
        <>
            <Header />
            <MainContainer>
                <IntroContainer>
                    <div>
                        안녕하세요! <br />
                        다시다예요 :&#41;
                        <span>
                            함께 지식을 우려내볼까요?
                            <br />첫 맛은 저희가 선사할게요
                        </span>
                    </div>
                </IntroContainer>
            </MainContainer>
       
        </>
    );
}
