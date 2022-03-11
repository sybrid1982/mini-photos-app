import httpCommon from "../http-common";

export function fetchMinisForGame(id) {
    const url = `/minis/game/${id}`;
    return httpCommon.get(url).then(x => x.data)
}

export function createMiniForGame(mini) {
    const url = `/minis`;
    return httpCommon.post(url, mini).then(x => x.data);
}

export function fetchMiniById(id) {
    const url = `/minis/${id}`;
    return httpCommon.get(url).catch(error => console.error(error)).then(x => x.data);
}