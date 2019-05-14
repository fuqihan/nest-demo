export class Addr {
    text?: string;
    location?: string;
}

export class Code {
    code?: number;
    message?: string;
}

export class Company {
    name?: string;
}

export class History {
    switchLocation?: string;
    switchAddr?: string;
    onHour?: boolean;
    offHour?: boolean;
    date?: string;
    onDate?: string;
    offDate?: string;
    onLocation?: string;
    offLocation?: string;
}

export abstract class IMutation {
    abstract createCompany(name: string, dept?: string[], addr?: Addr[]): Company | Promise<Company>;

    abstract daka(date: string, phone: string, type: string, location: string): Code | Promise<Code>;
}

export abstract class IQuery {
    abstract searchHistory(phone: string, year: number, month: number, day: number): History | Promise<History>;

    abstract defaultHistory(phone: string): History[] | Promise<History[]>;

    abstract getUser(phone: string): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class User {
    name?: string;
    phone?: string;
    dept?: string;
    company?: string;
    faceRegister?: boolean;
    companyLocation?: string;
    companyAddr?: string;
}
