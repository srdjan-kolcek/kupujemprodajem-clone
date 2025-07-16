import { BaseEntity } from "./BaseEntity.model";

export type Kategorija = BaseEntity & {
    naziv: string;
}