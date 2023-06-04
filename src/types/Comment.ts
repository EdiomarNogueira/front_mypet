import { User } from "./User";

export type Comment = {
    id: number;
    id_post: number;
    id_user: number;
    body: string;
    status: number;
    date_register: string;
    date_change: string;
    user: User;
    parentId: number | null; // ID do comentário pai ou null
    childComments: Comment[]; // Nova propriedade para armazenar os comentários filhos

}
