import { Staff } from './Staff';
import { Patient } from './Patient';
import { Doctor } from './Doctor';
import { IsNotEmpty, Length } from 'class-validator';
import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'appointment' })
export class Appointment {
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

    @Column()
    @Length(4, 50)
    @IsNotEmpty()
    public duration: string;

    @Column()
    @UpdateDateColumn()
    public appointmentDate: Date;


    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt: Date;

    @ManyToOne(() => Doctor, (doctor: Doctor) => doctor.appointments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor;

    @ManyToOne(() => Patient, (patient: Patient) => patient.appointments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'patientId' })
    patient: Patient;

    @ManyToOne(() => Staff, (staff: Staff) => staff.appointments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'createdBy' })
    staff: Staff;
}

export default Appointment;