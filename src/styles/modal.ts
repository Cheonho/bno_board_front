import styled from "styled-components";

export const ModalBack = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

export const PageModal = styled.div`
  width: 360px;
  height: 100px;
  z-index: 100;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 1)
`;

export const MessgaeStyle = styled.div<{color?: string}>`
  position: absolute;
  top:30%;
  left:50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  color: ${(props) => props.color || "rgba(0, 0, 0, 1)"}
`