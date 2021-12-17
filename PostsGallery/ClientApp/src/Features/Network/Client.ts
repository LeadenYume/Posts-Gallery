import { appDispatch } from "../../App/store";
import { AddPostRequest, AuthenticateRequest, AuthenticateResponse, NewUserRequest, Post, User } from "../../csts";
import { logIn, logOut } from "../AccountInfo/AccountInfoSlice";
import { addPostsEnd } from "../Posts/PostsSlice";
import { get, post, setToken } from "./Helpers";
import { Network } from "./Network";

function setUser(user: User | undefined) {
    if (user) {
        appDispatch(logIn({
            login: user.login,
            name: user.name,
            id: user.id
        }));
    }
}

class Client extends Network {

    protected override async onLoad() {
        const user = await this.accountInfo();
        setUser(user);
    }

    protected override ajaxWork() {
        this.updatePosts();
        
    }

    private updatePosts = async () => {
        const response = await get("api/posts");
        if (response.status === 200) {
            const posts: Post[] = await response.json();
            appDispatch(addPostsEnd(posts));
        }
    }

    public async authenticate(data: AuthenticateRequest) {
        const response = await post("api/users/authenticate", data);
        if (response.status === 200) {
            const authResponse: AuthenticateResponse = await response.json();
            setUser(authResponse);
            setToken(authResponse.jwtToken);
            return true;
        } else {
            return false;
        }
    }

    public async accountInfo() {
        const response = await this.getWithAuth("api/users/info");
        if (response.status === 200) {
            return await response.json() as User;
        } else {
            return undefined;
        }
    }

    public async createAccount(user: NewUserRequest) {
        const response = await this.postWithAuth("api/users/register", user);
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    }

    public async addPost(post: AddPostRequest) {
        const response = await this.postWithAuth("api/posts/create", post);
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    }

    public async logOut() {
        await this.postWithAuth("api/users/revoke-token", { token: null });
        appDispatch(logOut(undefined));
        setToken("");
    }

}


export const api = new Client();