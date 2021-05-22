import { apiUrl, isErrorResponse } from "./base";

export const submitMouseMove = async (dx, dy) => {
  const body = JSON.stringify({ dX: dx, dY: dy });

  const response = await fetch(apiUrl + "/api/mouse/move", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (isErrorResponse(response)) {
    return Promise.reject(
      `Error when submitting move request ${await response.text()}`
    );
  }
};

export const submitScroll = async (dy, direction) => {
  const body = JSON.stringify({ dY: dy, direction });
  const response = await fetch(apiUrl + "/api/mouse/scroll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (isErrorResponse(response)) {
    return Promise.reject(
      `Error when submitting scroll request ${await response.text()}`
    );
  }
};

export const submitMouseClick = async () => {
  const response = await fetch(apiUrl + "/api/mouse/click", {
    method: "POST",
  });

  if (isErrorResponse(response)) {
    return Promise.reject(
      `Error when submitting click request ${await response.text()}`
    );
  }
};
