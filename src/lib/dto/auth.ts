interface UserPayloadData {
    userId: number;
    username: string;
    email: string;
    isAdmin: boolean;
}

interface LoginResponse {
    id: number;
    username: string;
    email: string;
    token: string;
    avatar: string;
    createdAt: Date;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterResponse {
    id: number;
    username: string;
    email: string;
    avatar?: string;
    createdAt: string;
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}


export { LoginResponse, LoginRequest, RegisterResponse, RegisterRequest, UserPayloadData }
