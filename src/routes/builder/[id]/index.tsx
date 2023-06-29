import { component$, useComputed$, useStore, $, useStylesScoped$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { UnitCard } from "~/components/unit-card";
import type { Datasheet, UnitComposition } from "~/models/GwAppInterfaces";
import type { IArmyUnit } from "~/models/iarmyUnit";
import { getArmy, getDataSheets } from "~/services/40kServerCache";

export interface IArmyState {
    armyUnits: IArmyUnit[],
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

    const armyStore = useStore<IArmyState>({
        armyUnits: []
    });

    const addUnit = $((dataSheet: Datasheet, unitComponent: UnitComposition) => { 
        console.log(`addUnit start: ${new Date().getTime()}`); 
        armyStore.armyUnits.push({ dataSheet, unitComponent}); 
        console.log(`addUnit end: ${new Date().getTime()}`); });

    const removeUnit = $((index: number): void => { 
        if (!index) return;
        armyStore.armyUnits.splice(index, 1);
    });
    const points = useComputed$(() => {
        const points = armyStore.armyUnits.length > 0 
            ? armyStore.armyUnits.reduce((acc, curr) => acc + curr.unitComponent.points, 0)
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
                    { armyDetails?.map((ad, i) => 
                        <div class="mb-1" key={i}>
                            <UnitCard key={i} icon="add" armyUnit={ad} onClick$={addUnit} />
                        </div> )}
                </div>
                <div class="border-solid border-white border-l-2 overflow-y-auto">
                    {armyStore ? armyStore?.armyUnits.map((units, i) => 
                    <div class="mb-1" key={i}>
                        {i}
                        <UnitCard key={i} icon="subtract" armyUnit={units.dataSheet} setOption={units.unitComponent} onClick$={() => { removeUnit(i); }} />
                    </div>) : null}
                </div>
            </article>
        </div>
    );
});