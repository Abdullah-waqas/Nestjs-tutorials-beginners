import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import Roles from './..//entities/Roles';
import { Permission } from './../entities/Permission';
import { Permissions } from './../entities/Permissions';


export class InitializeTables1603533304850 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const permissionList = [
            { id: 12, type: 'create_appointment' },
            { id: 13, type: 'update_appointment' },
            { id: 14, type: 'view_appointment' },
            { id: 15, type: 'delete_appointment' },
        ];

        const permissionList1 = [
            { id: 122, type: 'create_appointment' },
            { id: 132, type: 'update_appointment' },
            { id: 142, type: 'view_appointment' },
            { id: 152, type: 'delete_appointment' },
        ];

        const rolesList = [
            { id: 121, type: 'PATIENT' },
            { id: 131, type: 'DOCTOR' },
            { id: 141, type: 'STAFF' },
        ];
        await queryRunner.createTable(
            new Table({
                name: 'roles',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'type',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '255',
                    },
                    {
                        name: 'createdAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into(Roles)
            .values(rolesList)
            .execute();

        await queryRunner.createTable(
            new Table({
                name: 'permission',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'type',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '255',
                    },
                    {
                        name: 'createdAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into(Permission)
            .values(permissionList)
            .execute();

        await queryRunner.createTable(
            new Table({
                name: 'permissions',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'type',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '255',
                    },
                    {
                        name: 'createdAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into(Permissions)
            .values(permissionList1)
            .execute();

        await queryRunner.createTable(
            new Table({
                name: 'super_admin',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'firstName',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '50',
                    },
                    {
                        name: 'lastName',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '50',
                    },
                    {
                        name: 'password',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '255',
                    },
                    {
                        name: 'address',
                        type: 'character varying',
                        isNullable: false,
                        isUnique: false,
                        length: '100',
                    },
                    {
                        name: 'createdAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'username',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '50',
                    },
                    {
                        name: 'password',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '255',
                    },
                    {
                        name: 'createdAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'roleId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'firstName',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '50',
                    },
                    {
                        name: 'lastName',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '50',
                    },
                    {
                        name: 'password',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '255',
                    },
                    {
                        name: 'address',
                        type: 'character varying',
                        isUnique: false,
                        isNullable: false,
                        length: '100',
                    },
                    {
                        name: 'isActive',
                        type: 'BOOLEAN',
                        isNullable: false,
                        isUnique: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'doctor',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'firstName',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '50',
                    },
                    {
                        name: 'lastName',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '50',
                    },
                    {
                        name: 'password',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '255',
                    },
                    {
                        name: 'address',
                        type: 'character varying',
                        isUnique: false,
                        isNullable: false,
                        length: '100',
                    },
                    {
                        name: 'isActive',
                        type: 'BOOLEAN',
                        isNullable: false,
                        isUnique: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'staff',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'firstName',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '50',
                    },
                    {
                        name: 'lastName',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '50',
                    },
                    {
                        name: 'password',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '255',
                    },
                    {
                        name: 'address',
                        type: 'character varying',
                        isUnique: false,
                        isNullable: false,
                        length: '100',
                    },
                    {
                        name: 'isActive',
                        type: 'BOOLEAN',
                        isNullable: false,
                        isUnique: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'patient',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'firstName',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '50',
                    },
                    {
                        name: 'lastName',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '50',
                    },
                    {
                        name: 'password',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '255',
                    },
                    {
                        name: 'address',
                        type: 'character varying',
                        isUnique: false,
                        isNullable: false,
                        length: '100',
                    },
                    {
                        name: 'isActive',
                        type: 'BOOLEAN',
                        isNullable: false,
                        isUnique: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'users_permission',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'userId',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'permissionId',
                        type: 'int',
                        isNullable: true,
                    },
                ],
            }),
        );

        

        

        

        await queryRunner.createTable(
            new Table({
                name: 'users_appointment',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'patientId',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'doctorId',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'createdBy',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'appointmentStartDate',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'appointmentEndDate',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'createdAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'appointment',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'patientId',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'doctorId',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'createdBy',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'duration',
                        type: 'character varying',
                        isUnique: true,
                        isNullable: false,
                        length: '100',
                    },
                    {
                        name: 'appointmentStartDate',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'appointmentEndDate',
                        type: 'TIMESTAMP',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );

        // Appointment
        await queryRunner.createForeignKey(
            'appointment',
            new TableForeignKey({
                columnNames: ['doctorId'],
                referencedTableName: 'doctor',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );
        await queryRunner.createForeignKey(
            'appointment',
            new TableForeignKey({
                columnNames: ['patientId'],
                referencedTableName: 'patient',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );
        await queryRunner.createForeignKey(
            'appointment',
            new TableForeignKey({
                columnNames: ['createdBy'],
                referencedTableName: 'staff',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );

        // UsersAppointment
        await queryRunner.createForeignKey(
            'users_appointment',
            new TableForeignKey({
                columnNames: ['doctorId'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );
        await queryRunner.createForeignKey(
            'users_appointment',
            new TableForeignKey({
                columnNames: ['patientId'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );
        await queryRunner.createForeignKey(
            'users_appointment',
            new TableForeignKey({
                columnNames: ['createdBy'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );


        // Permission
        await queryRunner.createForeignKey(
            'users_permission',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );
        // UsersPermissionlist
        await queryRunner.createForeignKey(
            'users_permission',
            new TableForeignKey({
                columnNames: ['permissionId'],
                referencedTableName: 'permissions',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );

        // roles
        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                columnNames: ['roleId'],
                referencedTableName: 'roles',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('appointment');



        // await queryRunner.dropTable('permission');
        // await queryRunner.dropTable('permissions');

        await queryRunner.dropTable('users_appointment');
        await queryRunner.dropTable('users_permission');

        await queryRunner.dropTable('permission');


        await queryRunner.dropTable('super_admin');
        await queryRunner.dropTable('patient');
        await queryRunner.dropTable('doctor');
        await queryRunner.dropTable('staff');
        await queryRunner.dropTable('user');
        await queryRunner.dropTable('users');

        await queryRunner.dropTable('permissions');
        await queryRunner.dropTable('roles');

    }
}