export const mapErrorMsg = (mapMessage: (msg: string) => string, e: unknown) => {
    if (e instanceof Error) {
        console.error(mapMessage(e.message));
        return new Error(mapMessage(e.message));
    }
    return e;
};
