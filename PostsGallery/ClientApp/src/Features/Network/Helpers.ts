

export function setToken(token: string) {
    localStorage.setItem('jwtToken', token);
}

export function getToken() {
    return localStorage.getItem('jwtToken');
}

export async function post<T>(path: string, data: T, header: object = {}) {
    const response = await fetch(path, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            ...header
        }),
        body: data ? JSON.stringify(data) : null
    });
    return response;
}

export async function get(path: string, header: object = {}) {
    const response = await fetch(path, {
        method: 'GET',
        headers: new Headers({
            ...header
        })
    });
    return response;
}