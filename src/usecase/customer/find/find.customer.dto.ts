// Meu Input deve ser nesse formato
export interface InputFindCustomerDto {
    id: string;
}

// Meu Output deve ser nesse formato
export interface OutputFindCustomerDto {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zip: string;
    };
}