
export interface Book {
    title: string;
    authors: string[];
    description: string;
    image: string;
    infolink: string;
}

export interface Query {
    params: {id: string}
}