// src/components/Header/HeaderContainer.tsx
import HeaderView from './HeaderView';
import { useState } from 'react';

export default function HeaderContainer() {
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return <HeaderView modal={modal} openModal={openModal} closeModal={closeModal} />;
}
