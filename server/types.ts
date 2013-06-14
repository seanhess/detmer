
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


// or we could store them on the client... later :)
export interface Disposition {
    name: string;
    value: number;
    clientId: string;
    created: string; // TODO get this to be a date, and add serialization
}