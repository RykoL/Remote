const { apiUrl } = require("./base");
const { submitMouseMove, submitScroll, submitMouseClick } = require("./MouseApiService");

describe("MouseApiService", () => {

    global.fetch = jest.fn();

    const fetchOptionTemplate = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    };

    beforeEach(() => {
        fetch.mockClear();
    })

    describe("submitMouseMove", () => {
        test("should throw if the request wasn't successfull", () => {

            fetch.mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 400,
                    text: () => Promise.resolve("Wrong input")
                });
            });

            expect(submitMouseMove(0, 0)).rejects.toEqual("Error when submitting move request Wrong input");
        });

        test("should resolve if request was successfull", () => {

            fetch.mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 200,
                    text: () => Promise.resolve("Wrong input")
                });
            });

            const fetchBody = {...fetchOptionTemplate, body: JSON.stringify({dX: 300, dY: 400})};

            expect(submitMouseMove(300, 400)).resolves.toEqual(undefined);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(`${apiUrl}/api/mouse/move`, fetchBody);
        })
    });

    describe("submitScroll", () => {
        test("should throw if the request wasn't successfull", () => {

            fetch.mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 400,
                    text: () => Promise.resolve("Wrong input")
                });
            });

            expect(submitScroll(0, "")).rejects.toEqual("Error when submitting scroll request Wrong input");
        });

        test("should resolve if request was successfull", () => {

            fetch.mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 200,
                    text: () => Promise.resolve("Wrong input")
                });
            });

            const fetchBody = {...fetchOptionTemplate, body: JSON.stringify({dY: 400, direction: "up"})};

            expect(submitScroll(400, "up")).resolves.toEqual(undefined);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(`${apiUrl}/api/mouse/scroll`, fetchBody);
        })
    });

    describe("submitMouseClick", () => {
        test("should throw if the request wasn't successfull", () => {

            fetch.mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 400,
                    text: () => Promise.resolve("Wrong input")
                });
            });

            expect(submitMouseClick()).rejects.toEqual("Error when submitting click request Wrong input");
        });

        test("should resolve if request was successfull", () => {

            fetch.mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 200,
                    text: () => Promise.resolve("Wrong input")
                });
            });

            expect(submitMouseClick()).resolves.toEqual(undefined);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(`${apiUrl}/api/mouse/click`, {method: "POST"});
        })
    });
});