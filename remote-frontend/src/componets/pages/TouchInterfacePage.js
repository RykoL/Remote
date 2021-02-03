import { useState } from "react";
import styled from "styled-components";
import { submitMouseMove, submitMouseClick, submitScroll } from "../../service/MouseApiService";
import { calculateMovementDelta, touchListToArray } from "../../util";

const StyledMain = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const OkButton = styled.div`
  border: 2px solid #f2f5f4;
  border-radius: 50%;
  margin: 0 auto;
  max-width: 200px;
  max-height: 200px;
  min-width: 200px;
  min-height: 200px;
  text-align: center;
  grid-row: 2 / 2;
  grid-column: 2 / 2;
  animation: fadein 5s infinite;

  @keyframes fadein {
    0% {
      opacity: 0.2;
      transform: scale(0.95);
    }

    50% {
      opacity: 1;
      transform: scale(1);
    }

    100% {
      opacity: 0.2;
      transform: scale(0.95);
    }
  }

  & p {
    font-size: 4em;
    font-weight: bold;
  }
`;

const TouchInterfacePage = () => {
  const [touchMap, setTouchMap] = useState(new Map());

  const onClick = async () => {
    await submitMouseClick();
  };

  const onTouchStart = (evt) => {
    const touchPairs = touchListToArray(evt.touches).map((touch) => {
      return [touch.identifier, touch];
    });
    setTouchMap(new Map(touchPairs));
  };

  const onTouchMove = async (evt) => {
    const changedTouches = touchListToArray(evt.changedTouches);
    const numTouches = changedTouches.length;

    const deltaReducer = ({ dX, dY }, touch) => {
      const initialTouch = touchMap.get(touch.identifier);

      const x = Math.round(
        calculateMovementDelta(initialTouch.clientX, touch.clientX)
      );
      const y = Math.round(
        calculateMovementDelta(initialTouch.clientY, touch.clientY)
      );

      return { dX: dX + x, dY: dY + y };
    };

    let deltas = changedTouches.reduce(deltaReducer, { dX: 0, dY: 0 });
    deltas = { dX: deltas.dX / numTouches, dY: deltas.dY / numTouches };

    if (numTouches === 1) {
      await submitMouseMove(deltas.dX, deltas.dY);
    } else {
      const direction = deltas.dY > 0 ? "down" : "up";
      await submitScroll(deltas.dY, direction);
    }
  };

  return (
    <StyledMain
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      <OkButton>
        <p>YO</p>
      </OkButton>
    </StyledMain>
  );
};

export default TouchInterfacePage;
