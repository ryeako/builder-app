import type { PropFunction } from "@builder.io/qwik";
import type { IUnitOption } from "./iunitOption";
import type { IUnitCardBase } from "./iunitCardBase";

export interface IUnitOptionProps extends IUnitCardBase {
    unitOptions: IUnitOption,
    onClick$: PropFunction<(unitOption: IUnitOption) => void>;
}