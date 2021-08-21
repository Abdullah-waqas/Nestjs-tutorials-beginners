import * as bcrypt from 'bcryptjs';
import { PatientPermission } from './PatientPermission';
import { Appointment } from './Appointment';
import { IsNotEmpty, Length } from 'class-validator';
import {
    Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'patient' })
export class Patient {
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

    @OneToMany(() => Appointment, (appointment: Appointment) => appointment.patient, {
        onDelete: 'CASCADE',
    })
    appointments: Array<Appointment>;

    @OneToMany(() => PatientPermission, (patientPermission: PatientPermission) => patientPermission.patient, {
        onDelete: 'CASCADE',
    })
    patientPermissions: Array<PatientPermission>;

    public hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}

export default Patient;