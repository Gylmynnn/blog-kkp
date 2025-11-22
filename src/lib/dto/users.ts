interface UpdateUsersRequest {
    id: number;
    username?: string;
    avatar?: string;
    avatarId?: string;
    internshipStartDate?: string;
    internshipEndDate?: string;
    internshipPosition?: string;
    internshipDivision?: string;
    school?: string;
}

export { UpdateUsersRequest }
