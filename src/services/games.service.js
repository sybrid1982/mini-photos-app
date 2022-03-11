import httpCommon from "../http-common";

export function fetchGames() {
    const url = `/games`;
    return httpCommon.get(url).catch((error => error.response.status)).then(x => x.data)
}

export function fetchGame(id) {
    const url = `/games/${id}`;
    return httpCommon.get(url).catch((error => error.response.status)).then(x => x.data)
}

export function postGame(gameData, filename) {
    const url = '/games';
    gameData.boxArtUrl = filename;
    return httpCommon.post(url, gameData)
}