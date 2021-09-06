import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsNotEmpty, IsEnum } from 'class-validator';

export enum UserRole {
  PATIENT = 121,
  DOCTOR = 131,
  STAFF = 141,
}

export enum PermissionsEnum {
  CREATE_APPOINTMENT = '122',
  UPDATE_APPOINTMENT = '132',
  VIEW_APPOINTMENT = '142',
  DELETE_APPOINTMENT = '152'
}
export class RegisterUserDTO {

  @ApiProperty()
  @MinLength(4)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @MinLength(4)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @MinLength(4)
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserRole)
  @IsNotEmpty()
  public roleId: UserRole;

}

export class LoginDTO {

  @ApiProperty()
  @MinLength(6)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class RegisterDTO {

  @ApiProperty()
  @MinLength(6)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

}

export class LoginAdminDTO {

  @ApiProperty()
  @MinLength(4)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @MinLength(4)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class RegisterAdminDTO {

  @ApiProperty()
  @MinLength(4)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @MinLength(4)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @MinLength(4)
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

}
export class LoginUserDTO {

  @ApiProperty()
  @MinLength(4)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @MinLength(4)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class ActivateUserParamDTO {

  @IsNotEmpty()
  readonly userId: number;
}

export class AssignPermissionDTO {

  @IsNotEmpty()
  readonly userId: number;

  @IsNotEmpty()
  readonly permissionId: number;

}

export class CreateAppointmentDTO {
  @IsNotEmpty()
  readonly patientId: number;

  @IsNotEmpty()
  readonly doctorId: number;

  @IsNotEmpty()
  readonly createdBy: number;

  @IsNotEmpty()
  readonly appointmentStartDate: Date;

  @IsNotEmpty()
  readonly appointmentEndDate: Date;

}

export class UpdateAppointmentDTO extends CreateAppointmentDTO {
  @IsNotEmpty()
  readonly id: number;
}

export class DeleteAppointmentParamDTO {

  @IsNotEmpty()
  readonly appointmentId: number;
}