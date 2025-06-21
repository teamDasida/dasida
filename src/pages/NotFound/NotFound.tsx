// src/pages/NotFound/NotFound.tsx
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Main } from '../../style/GlobalStyle';

const Container = styled(Main)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20vh;
  text-align: center;
`;

const Code = styled.h1`
  font-size: 6rem;
  margin: 0;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin: 1rem 0 2rem;
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: var(--Colors-Primary-200, #c4d7c2);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`;

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container>
      <Code>404</Code>
      <Message>죄송합니다, 페이지를 찾을 수 없습니다.</Message>
      <BackButton onClick={() => navigate('/')}>홈으로 돌아가기</BackButton>
    </Container>
  );
}
