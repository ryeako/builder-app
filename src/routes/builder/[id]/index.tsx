import { component$, useComputed$, useStore, $, useStylesScoped$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { UnitCard } from "~/components/unit-card";
import type { IArmyUnit } from "~/models/iarmyUnit";
import { GetUnitDetail } from "~/routes/data/40k10e/[id]";
import { GetArmy } from "~/routes/data/40k10e";

export interface IArmyState {
    armyUnits: IArmyUnit[],
}

export const useArmyDetails = routeLoader$(async (requestEvent) => {
    const armyDetails = GetUnitDetail(requestEvent.params.id);
    const army = GetArmy(requestEvent.params.id);

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

    const addUnit = $((armySelect: IArmyUnit) => { 
        console.log(`addUnit start: ${new Date().getTime()}`); 
        armyStore.armyUnits.push(armySelect); 
        console.log(`addUnit end: ${new Date().getTime()}`); });

    const removeUnit = $((index: number): void => { 
        armyStore.armyUnits.splice(index, 1);
    });
    const points = useComputed$(() => {
        const points = armyStore.armyUnits.length > 0 
            ? armyStore.armyUnits.reduce((acc, curr) => acc + curr.options[0].points, 0)
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
                    { armyDetails.map((ad, i) => <UnitCard key={i} icon="add" armyUnit={ad} onClick$={addUnit} /> )}
                </div>
                <div class="border-solid border-white border-l-2 overflow-y-auto">
                    {armyStore ? armyStore?.armyUnits.map((units, i) => <UnitCard key={i} icon="subtract" armyUnit={units} onClick$={() => { console.log(`removeUnit start: ${new Date()}`); removeUnit(i); console.log(`removeUnit end: ${new Date()}`); }} />) : null}
                </div>
            </article>
        </div>
    );
});