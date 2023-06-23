export class UnitSelect {
    constructor(change_available_units, dom_element_getter) {
        this.change_available_units = change_available_units;
        this.dom_element_getter = dom_element_getter;
        this.avaliable_units = new Set();
    }
    select_unit(new_unit) {
        var _a, _b;
        const old_unit = this.currently_selected;
        if (old_unit) {
            (_a = this.get_unit_option_element(old_unit)) === null || _a === void 0 ? void 0 : _a.removeAttribute('selected');
        }
        this.currently_selected = new_unit;
        this.change_available_units(old_unit, new_unit);
        (_b = this.get_unit_option_element(new_unit)) === null || _b === void 0 ? void 0 : _b.setAttribute('selected', '');
    }
    add_available_unit(new_unit) {
        this.avaliable_units.add(new_unit);
        this.add_option(new_unit);
    }
    remove_available_unit(unit_to_remove) {
        this.avaliable_units.delete(unit_to_remove);
        this.remove_option(unit_to_remove);
    }
    add_option(unit_to_add) {
        var _a;
        const option = document.createElement('option');
        option.value = unit_to_add;
        option.innerText = unit_to_add;
        (_a = this.dom_element_getter()) === null || _a === void 0 ? void 0 : _a.appendChild(option);
    }
    remove_option(unit_to_remove) {
        var _a;
        const option = (_a = this.dom_element_getter()) === null || _a === void 0 ? void 0 : _a.querySelector(`option[value=${unit_to_remove}]`);
        if (option) {
            option.remove();
        }
    }
    get_unit_option_element(unit) {
        var _a;
        return (_a = this.dom_element_getter()) === null || _a === void 0 ? void 0 : _a.querySelector(`option[value=${unit}]`);
    }
}
