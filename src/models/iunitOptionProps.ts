import type { PropFunction } from "@builder.io/qwik";
import type { IUnitCardBase } from "./iunitCardBase";
import type { UnitCompositionExtended } from "~/services/40kServerCache";

export interface IUnitOptionProps extends IUnitCardBase {
    unitOptions: UnitCompositionExtended,
    displayWarGear?: boolean,
    onClick$: PropFunction<(unitOption: UnitCompositionExtended) => void>;
}