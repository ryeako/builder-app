import { PropFunction } from "@builder.io/qwik";
import { IUnitOption } from "./iunitOption";

export interface IUnitOptionProps {
    unitOptions: IUnitOption,
    onClick$: PropFunction<(unitOption: IUnitOption) => void>;
}