const shutdown = async (server, options) => {
    process.on('SIGINT', () => server.close());
    process.on('SIGTERM', () => server.close());
};
export default shutdown;
