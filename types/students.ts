export type StudentsData = {
    id:                string
    certificateID:      string
    studentID:          string
    name:               string
    email:              string
    certificationName:  string
    link:               string | null
    issuedDate:         string | null
    issuedBy:           string
  }

  
  export type User = {
    id:             string           
    email:          string         
    name:           string
    role:           string        
    password:       string
    phone:          string
  }

  export type StudentCertificateDetails = {
    id: string;
    certificateID: string;
    studentID: string;
    name: string;
    email: string;
    link: string;
    certificationName: string;
    issuedBy: string;
    issuedDate: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  } | null;