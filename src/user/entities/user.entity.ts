import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    firstname: string;

    @Column({unique:true})
    email: string;

    @Column({ type: 'char', length: 60})
    password: string;

    // @OneToMany(()=> Product, (product)=> product.user_id, {cascade: true})
    // products: Product[];
}
