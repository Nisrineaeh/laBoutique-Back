import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'decimal', precision: 10, scale:2})
    price: number;

    @Column({type: 'int'})
    quantity: number;

    // @ManyToOne(()=> User, (user)=> user.products, {eager: true})
    // @JoinColumn({ name: "user_id" })
    // user_id: User;

    @ManyToOne(()=> Category, (category)=> category.products, {eager: true})
    @JoinColumn({ name: "category_id" })
    category_id: Category;
}
