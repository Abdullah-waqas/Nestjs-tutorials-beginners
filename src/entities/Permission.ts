import { StaffPermission } from './StaffPermission';
import { DoctorPermission } from './DoctorPermission';
import { PatientPermission } from './PatientPermission';
import {
    Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'permission' })
export class Permission {
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

    @OneToMany(() => PatientPermission, (patientPermission: PatientPermission) => patientPermission.permission, {
        onDelete: 'CASCADE',
    })
    patientPermissions: Array<PatientPermission>;

    @OneToMany(() => DoctorPermission, (patientPermission: DoctorPermission) => patientPermission.permission, {
        onDelete: 'CASCADE',
    })
    doctorPermissions: Array<DoctorPermission>;

    @OneToMany(() => StaffPermission, (staffPermission: StaffPermission) => staffPermission.permission, {
        onDelete: 'CASCADE',
    })
    staffPermissions: Array<StaffPermission>;
}

export default Permission;