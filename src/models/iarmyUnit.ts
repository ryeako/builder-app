import type { UnitCompositionExtended } from "~/services/40kServerCache";
import type { Datasheet } from "./GwAppInterfaces";

export interface IArmyUnit {
    id: string,
    dataSheet: Datasheet,
    unitComponent: UnitCompositionExtended
}