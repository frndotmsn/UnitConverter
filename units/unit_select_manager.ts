import { UnitSelect } from "./unit_select.js";

type ExtendedUnitSelect = UnitSelect & { default_unit: string, on_change?: (new_unit: string) => void };
type UnitSelectInput = { dom_getter_element: () => HTMLSelectElement | null, default_unit: string, on_change?: (new_unit: string) => void };

export class UnitSelectManager {
    available_units: string[];
    unit_selects: ExtendedUnitSelect [];
    constructor(availible_units: string[], unit_selects_inputs: UnitSelectInput[]) {
        this.available_units = availible_units;
        this.unit_selects = unit_selects_inputs.map((unit_select_input: UnitSelectInput): ExtendedUnitSelect => {
            const unit_select = new UnitSelect(
                (unit_to_add: string | undefined, unit_to_remove: string) => {
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
                },
                unit_select_input.dom_getter_element
            )
            return Object.assign(unit_select, { default_unit: unit_select_input.default_unit, on_change: unit_select_input.on_change });
        });
    }
    initialize() {
        this.unit_selects.forEach((unit_select) => {
            this.available_units.forEach((unit) => {
                unit_select.add_available_unit(unit);
            });
            unit_select.select_unit(unit_select.default_unit);
            unit_select.dom_element_getter()?.addEventListener('change', (event) => {
                const target = event.target as HTMLSelectElement;
                const new_unit = target.value;
                unit_select.select_unit(new_unit);
                unit_select.on_change?.(new_unit);
            })
        })
    }   
}