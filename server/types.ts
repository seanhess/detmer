
export interface Client {
    name: string;
    id: string;
    score:number;

    // not sure
    arr:number;
    renewalDate:Date;
    segment:string;

    // TODO clean these up
    contactName: string;
    contactTitle: string;
    contactPhone: string;
    contactEmail: string;
}


export interface Disposition {
    name: string;
    value: number;
}