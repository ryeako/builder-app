import { PropFunction } from "@builder.io/qwik";
import { IArmyUnit } from "./iarmyUnit";

export interface IUnitCardProps {
    armyUnit: IArmyUnit,
    onClick$?: PropFunction<(armySelect: IArmyUnit) => void>;
}
