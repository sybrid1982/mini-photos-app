import httpCommon from "../http-common";

export function fetchMinisForGame(id) {
    const url = `/minis/game/${id}`;
    return httpCommon.get(url).then(x => x.data)
}
