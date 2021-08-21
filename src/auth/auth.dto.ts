import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsNotEmpty, IsEmail } from 'class-validator';

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


export class RegisterDoctorDTO {

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


export class LoginDoctorDTO {

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


export class RegisterStaffDTO {

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


export class LoginStaffDTO {

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



export class RegisterPatientDTO {

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


export class LoginPatientDTO {

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