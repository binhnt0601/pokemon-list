export interface Pokemon {
    name: string;
    url: string;    
}

export interface ListResponse {
    count?: number;
    next?: string;
    previous?:string;
    results: Array<Pokemon>;
}

export interface GetListPayload {
	limit?: number;
}
