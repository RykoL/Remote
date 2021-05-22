import { useState } from "react";
import styled from "styled-components";
import { submitMouseClick } from "../api/MouseApiService";
import { OkButton } from "../components/TouchInterfacePage/OkButton";
import { MouseMoveHandler } from "../mouseHandlers/mouseMoveHandler";
import { MouseScrollHandler } from "../mouseHandlers/mouseScrollHandler";

const StyledMain = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const handlerMap = {
  1: MouseMoveHandler,
  2: MouseScrollHandler,
};

const TouchInterfacePage = () => {
  const [touchHandler, setTouchHandler] = useState();
  const [message, setMessage] = useState("YO");

  const onClick = async () => {
    await submitMouseClick();
  };

  const handleTouchStart = (evt) => {
    const handler = new handlerMap[evt.touches.length]();
    handler.startGesture(evt);
    setMessage(handler.operation);
    setTouchHandler(handler);
  };

  const onTouchMove = async (evt) => {
    await touchHandler.moveGesture(evt);
  };

  const onTouchEnd = async (evt) => {
    await touchHandler.endGesture(evt);
  };

  return (
    <StyledMain
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <OkButton>
        <p>{message}</p>
      </OkButton>
    </StyledMain>
  );
};

export default TouchInterfacePage;
