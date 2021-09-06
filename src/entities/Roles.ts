import {
    Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import Users from './Users';

@Entity({ name: 'roles' })
export class Roles {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        length: 255,
    })
    public type: string;

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt: Date;

}

export default Roles;