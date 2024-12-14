/*
    This file contains the interface for the Case object.
*/
export interface Case {
    name: string;
    href: string;
    date: string;
}

export class CaseModel implements Case {
    name: string;
    href: string;
    date: string;

    constructor(name: string, href: string, date: string) {
        this.name = name;
        this.href = href;
        this.date = date;
    }
}