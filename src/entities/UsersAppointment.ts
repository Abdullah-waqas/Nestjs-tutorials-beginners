import { IsNotEmpty, Length } from 'class-validator';
import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import Users from './Users';

@Entity({ name: 'users_appointment' })
export class UsersAppointment {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        width: 10,
    })
    public doctorId: number;

    @Column({
        width: 10,
    })
    public patientId: number;

    @Column({
        width: 10,
    })
    public createdBy: number;

    // @Column()
    // @Length(4, 50)
    // public duration: string;

    @Column()
    @UpdateDateColumn()
    public appointmentStartDate: Date;

    @Column()
    @UpdateDateColumn()
    public appointmentEndDate: Date;


    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt: Date;

}

export default UsersAppointment;