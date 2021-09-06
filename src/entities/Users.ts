import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, Length } from 'class-validator';
import {
    Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import Roles from './Roles';
import UsersAppointment from './UsersAppointment';

@Entity({ name: 'users' })
export class Users {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        width: 10,
    })
    public roleId: number;

    @Column()
    @Length(4, 50)
    @IsNotEmpty()
    public firstName: string;

    @Column()
    @Length(4, 50)
    @IsNotEmpty()
    public lastName: string;

    @Column()
    @Length(4, 255)
    @IsNotEmpty()
    public password: string;

    @Column()
    @Length(4, 100)
    @IsNotEmpty()
    public address: string;

    @Column({
        type: 'boolean',
        default: false
    })
    public isActive: boolean;

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt: Date;

    public hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}

export default Users;