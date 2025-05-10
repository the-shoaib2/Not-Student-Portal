export interface PersonalInfo {
  personId: number;
  firstName: string;
  middleName: string | null;
  lastName: string | null;
  nickName: string | null;
  birthDate: string;
  placeOfBirth: string | null;
  sex: 'Male' | 'Female' | 'Other';
  maritalStatus: string;
  bloodGroup: string;
  religion: string;
  nationality: string;
  voterId: string | null;
  passportNo: string | null;
  im: string | null;
  socialNetId: string | null;
  notes: string | null;
}

export interface MaritalStatus {
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widow' | 'Widower';
}

export interface BloodGroup {
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
}

export interface Religion {
  religion: 'Islam' | 'Hindu' | 'Christian' | 'Buddhist';
}

export interface PersonalTabProps {
  data: PersonalInfo | null;
  maritalStatus: MaritalStatus[];
  bloodGroup: BloodGroup[];
  religion: Religion[];
}
