import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import TouchInterfacePage from './TouchInterfacePage';
import { MouseInteractionService } from '../../service/MouseInteractionService';

jest.mock('../../service/MouseInteractionService');


const makeTouch = (x, y, identifier) => {
    return {clientX: x, clientY: y, identifier};
};


describe("TouchInterfacePage",() => {

    test("should send click request", async () => {
        render(<TouchInterfacePage />);

        fireEvent.click(screen.getByRole("main"));

        expect(MouseInteractionService.submitMouseClick).toHaveBeenCalledTimes(1);
    });

    test("should send mouse move request with single touch move", async () => {
        render(<TouchInterfacePage />);

        fireEvent.touchStart(screen.getByRole("main"), {touches: [makeTouch(0, 0, "a")]});
        fireEvent.touchEnd(screen.getByRole("main"), {changedTouches: [makeTouch(300, 700, "a")]});

        expect(MouseInteractionService.submitMouseMove).toHaveBeenCalledTimes(1);
        expect(MouseInteractionService.submitMouseMove).toHaveBeenCalledWith(300, 700);
    });

    test("should send scroll up request with double touch move upwards", async () => {
        render(<TouchInterfacePage />);

        fireEvent.touchStart(screen.getByRole("main"), {touches: [makeTouch(0, 700, "a"), makeTouch(0, 760, "b")]});
        fireEvent.touchEnd(screen.getByRole("main"), {changedTouches: [makeTouch(0, 300, "a"), makeTouch(0, 310, "b")]});

        expect(MouseInteractionService.submitScroll).toHaveBeenCalledTimes(1);
        expect(MouseInteractionService.submitScroll).toHaveBeenCalledWith(-425 ,"up");
    });

    test("should send scroll down request with double touch move downards", async () => {
        render(<TouchInterfacePage />);

        fireEvent.touchStart(screen.getByRole("main"), {touches: [makeTouch(0, 300, "a"), makeTouch(0, 310, "b")]});
        fireEvent.touchEnd(screen.getByRole("main"), {changedTouches: [makeTouch(0, 700, "a"), makeTouch(0, 760, "b")]});

        expect(MouseInteractionService.submitScroll).toHaveBeenCalledTimes(1);
        expect(MouseInteractionService.submitScroll).toHaveBeenCalledWith(425 ,"down");
    });
});