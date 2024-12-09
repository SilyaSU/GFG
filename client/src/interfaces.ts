export interface BookReview {
    id: number;
    title: string;
    author: string;
    genre: string;
    reviews: { id: number; content: string }[];
    discussions: { id: number; title: string }[];
}

export interface Discussion {
    id: number;
    title: string;
    content: string;
    bookId: number;
}

export interface LoginFormData {
    login: string;
    password: string;
}

export interface RegistrationFormData {
    login: string;
    password: string;
}