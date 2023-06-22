import type { PropFunction } from "@builder.io/qwik";
import type { IArmyUnit } from "./iarmyUnit";
import type { IUnitCardBase } from "./iunitCardBase";

export interface IUnitCardProps extends IUnitCardBase {
    armyUnit: IArmyUnit,
    onClick$?: PropFunction<(armySelect: IArmyUnit) => void>;
}
