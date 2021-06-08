import { Departman } from "./Departman";
import { Status } from "./Status";

export class Student{
  id: number;
  brojIndeksa: string;
  ime: string;
  prezime: string;
  departman: Departman;
  status: Status;
}
