import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { Permission } from './../entities/Permission';


export class InitializeTables1603533304850 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const permissionList = [
            { id: 12, type: 'create_appointment' },
            { id: 13, type: 'update_appointment' },
            { id: 14, type: 'view_appointment' },
            { id: 15, type: 'delete_appointment' },
        ];
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
                name: 'patient_permission',
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
                        name: 'permissionId',
                        type: 'int',
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'staff_permission',
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
                        name: 'staffId',
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
                name: 'doctor_permission',
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
                        name: 'doctorId',
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
                        name: 'appointmentDate',
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

        // Permission
        await queryRunner.createForeignKey(
            'doctor_permission',
            new TableForeignKey({
                columnNames: ['doctorId'],
                referencedTableName: 'doctor',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );
        await queryRunner.createForeignKey(
            'patient_permission',
            new TableForeignKey({
                columnNames: ['patientId'],
                referencedTableName: 'patient',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );
        await queryRunner.createForeignKey(
            'staff_permission',
            new TableForeignKey({
                columnNames: ['staffId'],
                referencedTableName: 'staff',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );

        // Permissionlist
        await queryRunner.createForeignKey(
            'doctor_permission',
            new TableForeignKey({
                columnNames: ['permissionId'],
                referencedTableName: 'permission',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );
        await queryRunner.createForeignKey(
            'patient_permission',
            new TableForeignKey({
                columnNames: ['permissionId'],
                referencedTableName: 'permission',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );
        await queryRunner.createForeignKey(
            'staff_permission',
            new TableForeignKey({
                columnNames: ['permissionId'],
                referencedTableName: 'permission',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'NO ACTION',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('appointment');
        await queryRunner.dropTable('patient_permission');
        await queryRunner.dropTable('staff_permission');
        await queryRunner.dropTable('doctor_permission');
        await queryRunner.dropTable('permission');
        await queryRunner.dropTable('super_admin');
        await queryRunner.dropTable('patient');
        await queryRunner.dropTable('doctor');
        await queryRunner.dropTable('staff');
        await queryRunner.dropTable('user');
    }
}