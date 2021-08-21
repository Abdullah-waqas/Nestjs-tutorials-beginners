import { Staff } from './Staff';
import { Permission } from './Permission';
import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'staff_permission' })
export class StaffPermission {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        width: 10,
    })
    public staffId: number;

    @Column({
        width: 10,
    })
    public permissionId: number;

    @ManyToOne(() => Permission, (permission: Permission) => permission.staffPermissions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'permissionId' })
    permission: Permission;

    @ManyToOne(() => Staff, (staff: Staff) => staff.staffPermissions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'staffId' })
    staff: Staff;
}

export default StaffPermission;