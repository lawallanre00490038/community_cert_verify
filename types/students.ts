export type StudentsData = {
    id:                string
    certificateID:      string
    studentID:          string
    name:               string
    email:              string
    certificationName:  string
    issuedBy:           string
  }

  
  export type User = {
    id:             string           
    email:          string         
    name:           string
    role:           string        
    password:       string
  }

  export type StudentCertificatedetails = {
    id: string;
    certificateID: string;
    studentID: string;
    name: string;
    email: string;
    link: string;
    certificationName: string;
    issuedBy: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  } | null;