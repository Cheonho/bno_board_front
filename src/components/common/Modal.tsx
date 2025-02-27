import {ModalBack, PageModal, MessgaeStyle} from 'styles/modal'

type Props = {
  modalClose: () => void;
  message?: string;
};

const Modalname = ({modalClose, message}: Props) => {
  const handleModalClick = (e: React.MouseEvent) => {
    modalClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ModalBack onClick={handleModalClick}>
      <PageModal onClick={handleContentClick}>
        <MessgaeStyle>{message}</MessgaeStyle>
      </PageModal>
    </ModalBack>
  )
}

export default Modalname