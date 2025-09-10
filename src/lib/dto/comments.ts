interface CreateCommentsRequest {
    content: string;
    authorId: number;
    postId: number;
}


interface UpdateCommentsRequest {
    id: number;
    content: string;
    authorId: number;
}

interface UpdateCommentPayload {
    content: string;
}


export { CreateCommentsRequest, UpdateCommentsRequest, UpdateCommentPayload }
