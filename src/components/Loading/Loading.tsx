import { LoadingContainer, Ball } from './styles';

export default function Loading() {
  return (
    <LoadingContainer>
      <Ball />
      <img src="/img/loading.png" alt="" />
    </LoadingContainer>
  );
}
