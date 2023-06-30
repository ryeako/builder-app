import type { PropFunction } from "@builder.io/qwik";
import type { IUnitCardBase } from "./iunitCardBase";
import type { Datasheet } from "./GwAppInterfaces";
import type { UnitCompositionExtended } from "~/services/40kServerCache";

export interface IUnitCardProps extends IUnitCardBase {
    armyUnit: Datasheet,
    setOption?: UnitCompositionExtended,
    onClick$?: PropFunction<(armySelect: Datasheet, option: UnitCompositionExtended) => void>;
}
