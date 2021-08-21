export interface Payload {
  username: string;
  iat?: number;
  expiresIn?: string;
}

export interface LoginAdminPayload {
  firstName: string;
  lastName: string;
  id?: number;
  address?: string;
  iat?: number;
  expiresIn?: string;
}

export interface LoginDoctorPayload {
  firstName: string;
  lastName: string;
  address?: string;
  id?: number;
  iat?: number;
  expiresIn?: string;
}


export interface LoginStaffPayload {
  firstName: string;
  lastName: string;
  address?: string;
  id?: number;
  iat?: number;
  expiresIn?: string;
}


export interface LoginPatientPayload {
  firstName: string;
  lastName: string;
  id?: number;
  address?: string;
  iat?: number;
  expiresIn?: string;
}