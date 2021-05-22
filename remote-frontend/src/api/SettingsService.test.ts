import SettingsService from './SettingsService';
import {apiUrl} from './base';

describe("ConfigService", () => {

    global.fetch = jest.fn();

    const fetchOptionTemplate = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    };

    beforeEach(() => {
        fetch.mockClear();
    })

    test("should resolve if request was succesfull", async () => {
        const config = {
            mouseSensitivity: 0.3,
            scrollSensitivity: 0.2,
        }

        fetch.mockImplementationOnce(() => {
            return Promise.resolve({
                status: 200,
                text: () => Promise.resolve("")
            });
        });

        await expect(SettingsService.saveSettings(config)).resolves.toEqual(undefined);

        const fetchOptions = {...fetchOptionTemplate, body: config};

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${apiUrl}/api/config`, fetchOptions);
    });

    test("should reject if request was not succesfull", async () => {
        const config = {
            mouseSensitivity: 0.3,
            scrollSensitivity: 0.2,
        }

        fetch.mockImplementationOnce(() => {
            return Promise.resolve({
                status: 400,
                text: () => Promise.resolve("")
            });
        });

        await expect(SettingsService.saveSettings(config)).rejects.toEqual(undefined);
    });

})
