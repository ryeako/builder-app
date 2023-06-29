import type { PropFunction } from "@builder.io/qwik";
import type { IUnitCardBase } from "./iunitCardBase";
import type { Datasheet, UnitComposition } from "./GwAppInterfaces";

export interface IUnitCardProps extends IUnitCardBase {
    armyUnit: Datasheet,
    setOption?: UnitComposition,
    onClick$?: PropFunction<(armySelect: Datasheet, option: UnitComposition) => void>;
}
