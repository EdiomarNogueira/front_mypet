import { Error } from '../types/Error';
import { PageCount } from '../types/PageCount';
import { CurrentPage } from '../types/CurrentPage';
import { User } from '../types/User';
import { Comment } from '../types/Comment';

export type Publish = {
    parentId: number;
    error:Error,
    id:number,
    id_user: number,
    id_pet: number,
    type:string,
    body:string,
    subtitle: string,
    date_register:string,
    date_change:string,
    mine:boolean,
    user:User,
    likeCount:number,
    liked:boolean,
    comments:[],
    marked_pets: [],
    pageCount:PageCount,
    currentPage:CurrentPage,
}
