import { Doctor } from './Doctor';
import { Permission } from './Permission';
import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'doctor_permission' })
export class DoctorPermission {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        width: 10,
    })
    public doctorId: number;

    @Column({
        width: 10,
    })
    public permissionId: number;

    @ManyToOne(() => Permission, (permission: Permission) => permission.doctorPermissions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'permissionId' })
    permission: Permission;

    @ManyToOne(() => Doctor, (doctor: Doctor) => doctor.doctorPermissions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor;
}

export default DoctorPermission;