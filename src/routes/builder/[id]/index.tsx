import type { QRL } from "@builder.io/qwik";
import { component$, useComputed$, useStore, $, useStylesScoped$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { v4 as uuidv4 } from "uuid";
import { UnitCard } from "~/components/unit-card";
import type { IArmyUnit } from "~/models/iarmyUnit";
import { getArmy, getDataSheets } from "~/services/40kServerCache";

export type IArmyState = {
    armyUnits: IArmyUnit[],
    addUnit: QRL<(this: IArmyState, armyUnit: IArmyUnit) => void>
    removeUnit: QRL<(this: IArmyState, id: string) => void>
}

export const useArmyDetails = routeLoader$(async (requestEvent) => {
    const armyDetails = await getDataSheets(requestEvent.params.id);
    const army = await getArmy(requestEvent.params.id);
    
    return {armyDetails, army};
});

export default component$(() => {
    const {armyDetails, army} = useArmyDetails().value;

    useStylesScoped$(`    
    .screen-adjust-height {
        height: calc(100vh - 5rem);
    }
    `);

    const state = useStore<IArmyState>({
        armyUnits: [],
        addUnit: $(function(this:IArmyState, armyUnit: IArmyUnit) {
            this.armyUnits.push(armyUnit);
        }),
        removeUnit: $(function (this: IArmyState, id: string) {
            this.armyUnits = this.armyUnits.filter(f => f.id !== id);
        })
    }, {deep: true});

    const points = useComputed$(() => {
        const points = state.armyUnits.length > 0 
            ? state.armyUnits.reduce((acc, curr) => acc + curr.unitComponent.points, 0)
            : 0;
        return points;
    });
    
    return (
        <div>
            <h1 class="block border-solid dark:border-white border-black border-b-2 text-xl h-20">
                <div>
                    {army?.name}
                </div>
                <div>
                    {points.value || 0}/2000
                </div>
            </h1>

            <article class="grid grid-cols-2 gap-3 relative screen-adjust-height">
                <div class="overflow-y-auto">
                    { armyDetails?.sort((a, b) => a.displayOrder - b.displayOrder).map((ad, i) => 
                        <div class="my-1" key={i}>
                            {ad.id}
                            <UnitCard key={i} icon="add" armyUnit={ad} onClick$={(dataSheet, option) => state.addUnit({ id: uuidv4(), dataSheet: dataSheet, unitComponent: option})} />
                        </div> )}
                </div>
                <div class="border-solid border-white border-l-2 overflow-y-auto">
                    {state ? state?.armyUnits.map((units) => 
                    <div class="mb-1" key={units.id}>
                        <UnitCard icon="subtract" armyUnit={units.dataSheet} setOption={units.unitComponent} onClick$={() => { state.removeUnit(units.id) }} />
                    </div>) : null}
                </div>
            </article>
        </div>
    );
});