import { Pact } from '@pact-foundation/pact'
import ConfigService from './ConfigService'

const provider = new Pact({
    consumer: 'MouseUI',
    provider: 'MouseAPI',
    port: 4000,
})

describe("Settings API", () => {

    describe("when a GET request is made", () => {
        beforeAll(() => {
            provider.setup()
                .then(() => {
                    provider.addInteraction({
                        uponReceiving: 'a request to return the settings',
                        withRequest: {
                            method: 'GET',
                            path: '/api/settings'
                        },
                        willRespondWith: {
                            status: 200,
                            headers: { "Content-Type": "application/json" },
                            body: {
                                mouseSensitivity: like(1.0),
                                scrollSensitivity: like(1.0)
                            }
                        }
                    })
                })
        })

        test("returns the correct settings", async () => {
            const resp = await ConfigService.getConfig()
            expect(resp.mouseSensitivity).toBe(1.0)
            expect(resp.scrollSensitivity).toBe(1.0)
        })


        afterEach(() => provider.verify());
        afterAll(() => provider.finalize());
    })
})
