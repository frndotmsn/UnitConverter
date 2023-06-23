import { UnitNumber } from './units/unit_number.js';
import { unit_map } from './units/unit_map.js';
import { default_unit_1, default_unit_2 } from './units/default_unit.js';
import { UnitSelect } from './units/unit_select.js';
import { UnitSelectManager } from './units/unit_select_manager.js';

const unit_1_number : UnitNumber = new UnitNumber(
    (new_amount : number) => {
        const unit_1_input = document.querySelector<HTMLInputElement>('#amount-1-input');
        if (unit_1_input)
        unit_1_input.value = new_amount.toString();
    });
const unit_2_number : UnitNumber = new UnitNumber(
    (new_amount : number) => {
        const unit_2_input = document.querySelector<HTMLInputElement>('#amount-2-input');
        if (unit_2_input)
        unit_2_input.value = new_amount.toString();
    });

const unit_select_manager = new UnitSelectManager(
    Array.from(unit_map.keys()),
    [
        {
            dom_getter_element: () => document.querySelector<HTMLSelectElement>('#unit-1'),
            default_unit: default_unit_1,
            on_change: (new_unit: string) => {
                unit_1_number.update_unit(new_unit);
            }
        },{
            dom_getter_element: () => document.querySelector<HTMLSelectElement>('#unit-2'),
            default_unit: default_unit_2,
            on_change: (new_unit: string) => {
                unit_2_number.update_unit(new_unit);
            }
        }
    ]
);

const check_if_input_is_valid = (input : string) => {
    const regex = new RegExp('^[0-9]+(\.[0-9]+)?$');
    return regex.test(input);
}

const update_amount_input_1 = () => {
    const unit_1 = document.querySelector<HTMLSelectElement>('#unit-1')?.value
    const unit_1_val = document.querySelector<HTMLInputElement>('#amount-1-input')?.value
    if (unit_1 && unit_1_val && check_if_input_is_valid(unit_1_val)) {
        unit_1_number.update_amount(parseFloat(unit_1_val));
    }
}

const update_amount_input_2 = () => {
    const unit_2 = document.querySelector<HTMLSelectElement>('#unit-2')?.value
    const unit_2_val = document.querySelector<HTMLInputElement>('#amount-2-input')?.value
    if (unit_2 && unit_2_val && check_if_input_is_valid(unit_2_val)) {
        unit_2_number.update_amount(parseFloat(unit_2_val));
    }
}

window.addEventListener('load', () => {
    unit_select_manager.initialize();

    document.querySelector<HTMLInputElement>('#amount-1-input')?.addEventListener('input', update_amount_input_1)
    document.querySelector<HTMLInputElement>('#amount-2-input')?.addEventListener('input', update_amount_input_2)
    if (unit_select_manager.unit_selects[0].currently_selected)
        unit_1_number.initialize(unit_select_manager.unit_selects[0].currently_selected, unit_2_number);
    if (unit_select_manager.unit_selects[1].currently_selected)
        unit_2_number.initialize(unit_select_manager.unit_selects[1].currently_selected, unit_1_number);
})