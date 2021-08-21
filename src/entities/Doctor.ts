import * as bcrypt from 'bcryptjs';
import { DoctorPermission } from './DoctorPermission';
import { Appointment } from './Appointment';
import { IsNotEmpty, Length } from 'class-validator';
import {
    Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'doctor' })
export class Doctor {
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

    @OneToMany(() => Appointment, (appointment: Appointment) => appointment.doctor, {
        onDelete: 'CASCADE',
    })
    appointments: Array<Appointment>;

    @OneToMany(() => DoctorPermission, (doctorPermission: DoctorPermission) => doctorPermission.doctor, {
        onDelete: 'CASCADE',
    })
    doctorPermissions: Array<DoctorPermission>;

    public hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}

export default Doctor;