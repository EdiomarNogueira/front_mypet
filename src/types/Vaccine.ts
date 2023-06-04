import { Error } from '../types/Error';
import { PageCount } from '../types/PageCount';
import { CurrentPage } from '../types/CurrentPage';

export type Vaccine = {
    error:Error,
    
    id:number,
    id_user: number,
    id_pet:number,
    type:number,
    recommendation:string,
    name: string,
    application_date:string,
    date_register:string,
    date_change:string,
}
