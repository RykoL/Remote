export const calculateMovementDelta = (c1, c2) => {
    if (c1 === c2) {
        return 0;
    }

    const sign = (c2 > c1) ? 1 : -1;

    return sign * (Math.max(c1, c2) - Math.min(c1, c2));
};

export const touchListToArray = (touchList) => {
    const touches = [];

    for (let i = 0; i < touchList.length; i++) {
        touches.push(touchList[i]);
    }

    return touches;
}
