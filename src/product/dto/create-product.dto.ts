import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";

export class CreateProductDto {

    name: string;
    price: number;
    quantity: number;
    category_id: Category;
    user_id: User;
}
