import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, Length } from 'class-validator';
import {
    Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'super_admin' })
export class SuperAdmin {
    @PrimaryGeneratedColumn()
    public id: number;

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

export default SuperAdmin;