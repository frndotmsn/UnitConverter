import { UnitNumber } from "./unit_number";

export class UnitSelect {
    dom_element_getter: () => HTMLSelectElement | undefined | null;
    currently_selected: string | undefined;
    avaliable_units: Set<string>;
    change_available_units: (unit_to_add : string | undefined, unit_to_remove : string) => void;
    constructor(change_available_units: (
        unit_to_add : string | undefined, unit_to_remove : string) => void,
        dom_element_getter : () => HTMLSelectElement | undefined | null) {
        this.change_available_units = change_available_units;
        this.dom_element_getter = dom_element_getter;
        this.avaliable_units = new Set<string>();
    }
    select_unit(new_unit: string) {
        const old_unit = this.currently_selected;
        if (old_unit) {
            this.get_unit_option_element(old_unit)?.removeAttribute('selected');
        }
        this.currently_selected = new_unit;
        this.change_available_units(old_unit, new_unit);
        this.get_unit_option_element(new_unit)?.setAttribute('selected', '');
    }
    add_available_unit(new_unit: string) {
        this.avaliable_units.add(new_unit);
        this.add_option(new_unit);
    }
    remove_available_unit(unit_to_remove: string) {
        this.avaliable_units.delete(unit_to_remove);
        this.remove_option(unit_to_remove);
    }

    add_option(unit_to_add: string) {
        const option = document.createElement('option');
        option.value = unit_to_add;
        option.innerText = unit_to_add;
        this.dom_element_getter()?.appendChild(option);
    }

    remove_option(unit_to_remove: string) {
        const option = this.dom_element_getter()?.querySelector<HTMLSelectElement>(`option[value=${unit_to_remove}]`);
        if (option) {
            option.remove();
        }
    }

    get_unit_option_element(unit: string) {
        return this.dom_element_getter()?.querySelector<HTMLSelectElement>(`option[value=${unit}]`);
    }
}