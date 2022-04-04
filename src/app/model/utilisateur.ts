import { Role } from "./role";

export class Utilisateur {
  id: number;
  name: string;
  username: string;
  mobile: string;
  email: string;
  address: string;
  password: string;
  photo: string;
  activated: boolean = false;
  active?: boolean;
  confirmPassword?: string;
  
  roles?: Role[];
}
