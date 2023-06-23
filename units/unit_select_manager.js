import { UnitSelect } from "./unit_select.js";
export class UnitSelectManager {
    constructor(availible_units, unit_selects_inputs) {
        this.available_units = availible_units;
        this.unit_selects = unit_selects_inputs.map((unit_select_input) => {
            const unit_select = new UnitSelect((unit_to_add, unit_to_remove) => {
                this.unit_selects.forEach((unit_select) => {
                    if (unit_select.currently_selected !== unit_to_remove) {
                        unit_select.remove_available_unit(unit_to_remove);
                        if (unit_to_add) {
                            unit_select.add_available_unit(unit_to_add);
                        }
                    }
                });
                this.available_units = this.available_units.filter((unit) => unit !== unit_to_remove);
                if (unit_to_add) {
                    this.available_units.push(unit_to_add);
                    this.available_units.sort();
                }
            }, unit_select_input.dom_getter_element);
            return Object.assign(unit_select, { default_unit: unit_select_input.default_unit, on_change: unit_select_input.on_change });
        });
    }
    initialize() {
        this.unit_selects.forEach((unit_select) => {
            var _a;
            this.available_units.forEach((unit) => {
                unit_select.add_available_unit(unit);
            });
            unit_select.select_unit(unit_select.default_unit);
            (_a = unit_select.dom_element_getter()) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (event) => {
                var _a;
                const target = event.target;
                const new_unit = target.value;
                unit_select.select_unit(new_unit);
                (_a = unit_select.on_change) === null || _a === void 0 ? void 0 : _a.call(unit_select, new_unit);
            });
        });
    }
}
