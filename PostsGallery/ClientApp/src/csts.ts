export interface User{
	id: number;
	name: string;
	login: string;
}

export interface AddPostRequest{
	content: string;
}

export interface AuthenticateRequest{
	login: string;
	password: string;
}

export interface AuthenticateResponse{
	id: number;
	name: string;
	login: string;
	jwtToken: string;
}

export interface NewUserRequest{
	displayName: string;
	userName: string;
	password: string;
}

export interface Post{
	id: number;
	content: string;
	user: User;
}

export interface RevokeTokenRequest{
	token: string;
}

