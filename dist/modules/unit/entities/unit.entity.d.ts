export declare class Unit {
    unit_id: string;
    unit_name: string;
    unit_symbol: string;
    quantity_per_parent_unit?: number;
    is_delete?: boolean;
    created_on: Date;
    updated_on: Date;
    deleted_on: Date;
    parent_unit?: Unit;
    child_units: Unit[];
}
