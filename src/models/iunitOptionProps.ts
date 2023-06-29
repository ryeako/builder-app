import type { PropFunction } from "@builder.io/qwik";
import type { IUnitCardBase } from "./iunitCardBase";
import type { UnitComposition } from "./GwAppInterfaces";

export interface IUnitOptionProps extends IUnitCardBase {
    unitOptions: UnitComposition,
    onClick$: PropFunction<(unitOption: UnitComposition) => void>;
}