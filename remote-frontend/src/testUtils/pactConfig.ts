import path from 'path';

const pactConfig = {
    consumer: 'RemoteFrontend',
    provider: 'RemoteApi',
    port: 1234,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "INFO",
}

export default pactConfig;
