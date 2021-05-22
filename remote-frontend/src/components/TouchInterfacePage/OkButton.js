import styled from "styled-components";

export const OkButton = styled.div`
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
