import {ModalBack, PageModal, MessgaeStyle} from 'styles/modal'

type Props = {
  modalClose: () => void;
  message?: string;
  color?: string;
};

const Modalname = ({modalClose, message, color}: Props) => {
  const handleModalClick = (e: React.MouseEvent) => {
    modalClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ModalBack onClick={handleModalClick}>
      <PageModal onClick={handleContentClick}>
        <MessgaeStyle color={color}>{message}</MessgaeStyle>
      </PageModal>
    </ModalBack>
  )
}

export default Modalname