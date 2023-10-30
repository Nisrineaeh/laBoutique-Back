import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    firstname: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @OneToMany(()=> Product, (product)=> product.user_id, {cascade: true})
    products: Product[];
}
