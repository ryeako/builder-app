import type { PropFunction } from "@builder.io/qwik";
import type { IUnitCardBase } from "./iunitCardBase";
import type { Datasheet } from "./GwAppInterfaces";
import type { UnitCompositionExtended } from "~/services/40kServerCache";
import type { IArmyUnit } from "./iarmyUnit";

export interface IUnitCardProps extends IUnitCardBase {
    armyUnit?: IArmyUnit
    dataSheet: Datasheet,
    unitComposition?: UnitCompositionExtended,
    onClick$?: PropFunction<(armySelect: Datasheet, option: UnitCompositionExtended) => void>;
}
