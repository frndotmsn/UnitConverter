import { UnitNumber } from './units/unit_number.js';
import { unit_map } from './units/unit_map.js';
import { default_unit_1, default_unit_2 } from './units/default_unit.js';
import { UnitSelectManager } from './units/unit_select_manager.js';
const unit_1_number = new UnitNumber((new_amount) => {
    const unit_1_input = document.querySelector('#amount-1-input');
    if (unit_1_input)
        unit_1_input.value = new_amount.toString();
});
const unit_2_number = new UnitNumber((new_amount) => {
    const unit_2_input = document.querySelector('#amount-2-input');
    if (unit_2_input)
        unit_2_input.value = new_amount.toString();
});
const unit_select_manager = new UnitSelectManager(Array.from(unit_map.keys()), [
    {
        dom_getter_element: () => document.querySelector('#unit-1'),
        default_unit: default_unit_1,
        on_change: (new_unit) => {
            unit_1_number.update_unit(new_unit);
        }
    }, {
        dom_getter_element: () => document.querySelector('#unit-2'),
        default_unit: default_unit_2,
        on_change: (new_unit) => {
            unit_2_number.update_unit(new_unit);
        }
    }
]);
const check_if_input_is_valid = (input) => {
    const regex = new RegExp('^[0-9]+(\.[0-9]+)?$');
    return regex.test(input);
};
const update_amount_input_1 = () => {
    var _a, _b;
    const unit_1 = (_a = document.querySelector('#unit-1')) === null || _a === void 0 ? void 0 : _a.value;
    const unit_1_val = (_b = document.querySelector('#amount-1-input')) === null || _b === void 0 ? void 0 : _b.value;
    if (unit_1 && unit_1_val && check_if_input_is_valid(unit_1_val)) {
        unit_1_number.update_amount(parseFloat(unit_1_val));
    }
};
const update_amount_input_2 = () => {
    var _a, _b;
    const unit_2 = (_a = document.querySelector('#unit-2')) === null || _a === void 0 ? void 0 : _a.value;
    const unit_2_val = (_b = document.querySelector('#amount-2-input')) === null || _b === void 0 ? void 0 : _b.value;
    if (unit_2 && unit_2_val && check_if_input_is_valid(unit_2_val)) {
        unit_2_number.update_amount(parseFloat(unit_2_val));
    }
};
window.addEventListener('load', () => {
    var _a, _b;
    unit_select_manager.initialize();
    (_a = document.querySelector('#amount-1-input')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', update_amount_input_1);
    (_b = document.querySelector('#amount-2-input')) === null || _b === void 0 ? void 0 : _b.addEventListener('input', update_amount_input_2);
    if (unit_select_manager.unit_selects[0].currently_selected)
        unit_1_number.initialize(unit_select_manager.unit_selects[0].currently_selected, unit_2_number);
    if (unit_select_manager.unit_selects[1].currently_selected)
        unit_2_number.initialize(unit_select_manager.unit_selects[1].currently_selected, unit_1_number);
});
