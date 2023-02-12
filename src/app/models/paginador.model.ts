export interface Paginador{
    content?:[];
    totalPages?:number;
    totalElements?:number;
    first?:boolean;
    last?:boolean;
    size?:number;
    number?:number;
    empty?:boolean;
    numberOfElements?:number;
}