
// Entidade focada em NEGÓCIO

import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

// ORM utiliza entidade focada em PERSISTÊNCIA

// Se for usar ORM, utilizar duas entidades, uma pra persistir de dados e uma utilizada para negócio

// Na verdade classe de persistência NÃO É ENTIDADE

// Ex:
// Complexidade de Negócio
// Domain
// - Entity
// -- customer.ts (regra de negócio)

// Complexidade Acidental
// infra - Mundo Externo
// - Entity / Model
// -- customer.ts (get, set)
export default class Customer extends Entity{

    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();

        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get Address(): Address {
        return this._address;
    }

    validate() {
        CustomerValidatorFactory.create().validate(this);
    }

    set name(name: string) {
        this._name = name;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address)
    {
        this._address = address;
    }

    isActive(): boolean {
        return this._active;
    }

    activate() {
        if(this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    set Address(address: Address) {
        this._address = address;
    }
}

// *** UMA ENTIDADE POR PADRÃO SEMPRE TERÁ QUE SE AUTOVALIDAR ***