import { unit_map } from "./unit_map.js";

export class UnitNumber {
    unit: string | undefined;
    other_unit_number: UnitNumber | undefined;
    amount: number | undefined;

    on_change_amount: (new_amount : number) => void;
    constructor(on_change_amount: (new_amount : number) => void, amount: number | undefined = 0) {
        this.amount = amount;
        this.on_change_amount = on_change_amount;
    }
    initialize(unit: string, other_unit_number: UnitNumber) {
        this.other_unit_number = other_unit_number;
        this.update_unit(unit);
    }
    initialize_other_unit_number(unit: string, other_unit_number: UnitNumber) {
        this.other_unit_number = other_unit_number;
    }
    unit_in_base_unit() : number | undefined {
        if (!this.unit) return undefined;
        return unit_map.get(this.unit);
    }
    amount_in_base_unit() : number | undefined {
        if (!this.amount) return undefined;
        const unit_in_base_unit = this.unit_in_base_unit();
        if (!unit_in_base_unit) return undefined;
        return this.amount * unit_in_base_unit;
    }
    update_amount(new_amount: number) {
        this.amount = new_amount;
        if (this.amount && this.unit && this.other_unit_number?.unit) {
            const unit_1_value = unit_map.get(this.unit);
            const unit_2_value = unit_map.get(this.other_unit_number.unit);
            if (unit_1_value && unit_2_value && unit_2_value !== 0) {
                this.other_unit_number.amount = this.amount * unit_1_value / unit_2_value;
                this.other_unit_number.on_change_amount(this.other_unit_number.amount);
            }
        }
    }
    update_amount_from_base_unit(new_amount_in_base_unit: number) {
        const unit_in_base_unit = this.unit_in_base_unit();
        if (!unit_in_base_unit) return;
        this.update_amount(new_amount_in_base_unit / unit_in_base_unit);
    }
    update_unit(new_unit: string) {
        this.unit = new_unit;
        const amount_in_base_unit = this.amount_in_base_unit();
        if (!amount_in_base_unit) return;
        this.other_unit_number?.update_amount_from_base_unit(amount_in_base_unit);
    }
}