import { appDispatch } from "../../App/store";
import { AuthenticateResponse } from "../../csts";
import { bindMethods } from "../../Shared/Functions/Objects";
import { logOut } from "../AccountInfo/AccountInfoSlice";
import { get, getToken, post, setToken } from "./Helpers";


async function fetchWithAuth(req: (header: object) => Promise<Response>) {
    const token = getToken();
    const request = await req({ 'Authorization': 'Bearer ' + token });
    if (request.status === 401) {
        const response = await post("api/users/refresh-token", null);
        if (response.status === 200) {
            const user: AuthenticateResponse = await response.json();
            setToken(user.jwtToken);
            const request = await req({ 'Authorization': 'Bearer ' + getToken() });
            return request;
        } else {
            appDispatch(logOut(undefined));
            return response;
        }
    } else {
        return request;
    }
}

export abstract class Network {
    constructor() {
        bindMethods(this);
        setInterval(this.ajaxWork, 3000);
        this.onLoad();
    }

    protected abstract onLoad(): void;
    protected abstract ajaxWork(): void;

    protected async postWithAuth<T>(path: string, data: T) {
        const request = await fetchWithAuth(async (header) => {
            return await post(path, data, header);
        });
        return request;
    }

    protected async getWithAuth(path: string) {
        const request = await fetchWithAuth(async (header) => {
            return await get(path, header);
        });
        return request;
    }
}



