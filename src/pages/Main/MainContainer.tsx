import { useState } from 'react';
import MainPcView from './components/MainPcView';
import MainMobileView from './components/MainMobileView';
import useIsMobile from '../../hooks/useIsMobile';

export default function MainContainer() {
    const [modal, setModal] = useState(false);
    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);

    const isMobile = useIsMobile();

    return (
        <>
            {isMobile ? <MainMobileView /> : <MainPcView modal={modal} openModal={openModal} closeModal={closeModal} />}
        </>
    );
}
