import type { PropFunction } from "@builder.io/qwik";
import type { IArmyUnit } from "./iarmyUnit";

export interface IUnitCardProps {
    armyUnit: IArmyUnit,
    onClick$?: PropFunction<(armySelect: IArmyUnit) => void>;
}
