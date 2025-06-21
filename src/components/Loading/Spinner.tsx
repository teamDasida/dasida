import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);  /* 반투명 검정 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;                    /* 위에 떠 있도록 */
`;

const SpinnerDiv = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0,0,0,0.1);
  border-top-color: var(--Colors-Primary-200, #c4d7c2);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default function Spinner() {
  return (
    <Overlay>
      <SpinnerDiv />
    </Overlay>
  );
}
