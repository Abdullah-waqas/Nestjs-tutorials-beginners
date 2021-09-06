import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'users_permission' })
export class UsersPermission {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        width: 10,
    })
    public userId: number;

    @Column({
        width: 10,
    })
    public permissionId: number;

    // @ManyToOne(() => Permission, (permission: Permission) => permission.patientPermissions, {
    //     onDelete: 'CASCADE',
    // })
    // @JoinColumn({ name: 'permissionId' })
    // permission: Permission;

    // @ManyToOne(() => Patient, (patient: Patient) => patient.patientPermissions, {
    //     onDelete: 'CASCADE',
    // })
    // @JoinColumn({ name: 'patientId' })
    // patient: Patient;
}

export default UsersPermission;
