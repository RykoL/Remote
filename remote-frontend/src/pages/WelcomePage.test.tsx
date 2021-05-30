import {screen, render, waitFor} from '@testing-library/react'
import SettingsService from '../api/SettingsService'
import { WelcomePage } from './WelcomePage'

jest.mock("../api/SettingsService");

describe("Welcome Page", () => {

    it("should render a link to the application", async () => {

        SettingsService.whoami.mockResolvedValue("http://192.168.178.5");

        render(<WelcomePage />)

        await waitFor(SettingsService.whoami);

        expect(screen.getByRole("link")).toHaveAttribute('href', 'http://192.168.178.5')
    })
});
