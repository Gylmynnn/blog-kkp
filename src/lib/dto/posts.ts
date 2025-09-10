interface UpdatePostsRequest {
    id: number;
    title: string;
    content: string;
    authorId: number;
    image?: string;
    imageId?: string;
}

interface UpdatePostsResponse {
    id: number;
    title: string;
    content: string;
    authorId: number;
    image?: string;
    imageId?: string;
    createdAt: string;
    updatedAt: string;
}


interface CreatePostsRequest {
    title: string;
    content: string;
    authorId: number;
    image?: string;
    imageId?: string;
}


interface CreatePostsResponse {
    id: number;
    title: string;
    content: string;
    authorId: number;
    image?: string;
    imageId?: string;
    createdAt: string;
    updatedAt: string;
}

export { CreatePostsResponse, CreatePostsRequest, UpdatePostsRequest, UpdatePostsResponse }
