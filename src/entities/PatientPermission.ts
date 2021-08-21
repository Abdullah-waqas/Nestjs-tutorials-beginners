import { Patient } from './Patient';
import { Permission } from './Permission';
import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'patient_permission' })
export class PatientPermission {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        width: 10,
    })
    public patientId: number;

    @Column({
        width: 10,
    })
    public permissionId: number;

    @ManyToOne(() => Permission, (permission: Permission) => permission.patientPermissions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'permissionId' })
    permission: Permission;

    @ManyToOne(() => Patient, (patient: Patient) => patient.patientPermissions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'patientId' })
    patient: Patient;
}

export default PatientPermission;
