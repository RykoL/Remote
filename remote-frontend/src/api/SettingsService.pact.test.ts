import path from 'path';
import { Interaction, Pact } from '@pact-foundation/pact';

const provider = new Pact({
    consumer: 'RemoteFrontend',
    provider: 'RemoteApi',
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
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
                path: '/api/config'
            },
            willRespondWith: {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
                body

            }
        })
    })
});
