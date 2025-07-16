import { Drzava } from "./Drzava.model";

export type Grad = BaseEntity & {
    naziv: string;
    drzava: Drzava;
}