import path from 'path';
import {settingsFixture} from '../fixtures/settingsFixture';
import SettingsService from './SettingsService';
import { Pact } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/src/dsl/matchers';

const provider = new Pact({
    consumer: 'RemoteFrontend',
    provider: 'RemoteApi',
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    port: 4000,
    logLevel: "info",
})


describe("Configuration Pact", () => {

    beforeAll(() => provider.setup())
    afterEach(() => provider.verify())
    afterAll(() => provider.finalize())

    test("getting config", async () => {

        await provider.addInteraction({
            state: 'no config has been set',
            uponReceiving: 'a request go get the sensitivity config',
            withRequest: {
                method: 'GET',
                path: '/api/settings'
            },
            willRespondWith: {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: like({
                    mouseSensitivity: 1.0,
                    scrollSensitivity: 1.0,
                })
            }
        })


        expect(await SettingsService.getSettings())
            .toStrictEqual(settingsFixture)
    })
});
