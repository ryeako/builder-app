import { Resource, component$, useResource$, useSignal, $, useStore, useComputed$ } from "@builder.io/qwik";
import armies from './../data/40k10e/armies.json';
import { Card } from "~/components/army-card";
import { UnitCard } from "~/components/unit-card";
import type { IArmyUnit } from "~/models/iarmyUnit";

export default component$(() => {
    const selectedArmy = useSignal<string>("");
    const armyOptions = useResource$<IArmyUnit[] | undefined>(async ({ track }) => {
        track(() => selectedArmy.value);

        if (selectedArmy.value === "") return [];
        const path = `/data/40k10e/${selectedArmy.value}`;

        const res = await fetch(path);
        const data = await res.json();

        return data as IArmyUnit[];
    });
    const armyUnits = useStore<IArmyUnit[]>([]);

    const addUnit = $((armySelect: IArmyUnit) => { armyUnits.push(armySelect) });
    const removeUnit = $((index: number): void => { 
        armyUnits.splice(index, 1);
    });
    const points = useComputed$(() => {
        const points = armyUnits.reduce((acc, curr) => acc + curr.options[0].points, 0);
        return points;
    });

    return (
        <section class="dark:text-black fixed screen-adjust">
            <div class={[selectedArmy.value !== "" ? "hidden" : "", "flex flex-row flex-wrap gap-5 m-5"]}>
            {armies.map((a) => 
                <button type="button" key={a.id} onClick$={() => selectedArmy.value = a.id} class="p-0">
                    <Card title={a.name} img={ {src: a.url, alt: a.name }} isHighlighted={selectedArmy.value === a.id} />
                </button>
            )}
            </div>

            <div class={selectedArmy.value == "" ? "hidden" : ""}>
                <h1 class="block border-solid dark:border-white border-black border-b-2 text-xl">
                    <div>
                        {armies ? armies?.find(a => a.id === selectedArmy.value)?.name : null}
                    </div>
                    <div>
                        {points.value}/2000
                    </div>
                </h1>

                <article class="grid grid-cols-2 gap-3 h-screen">
                    <div class="overflow-y-auto">
                        <Resource 
                            value={armyOptions} 
                            onPending={() => <p>Loading</p>} 
                            onResolved={(ao) => (
                                <> { ao?.map((units, i) => <UnitCard key={i} armyUnit={units} onClick$={addUnit}/>) } </>
                            )}
                            onRejected={() => <p>Nothing to see here; move along.</p>} />
                    </div>
                    <div class="border-solid border-white border-l-2 overflow-y-auto">
                        {armyUnits ? armyUnits?.map((units, i) => <UnitCard key={i} armyUnit={units} onClick$={() => { removeUnit(i) }} />) : null}
                    </div>
                </article>
            </div>
        </section>
    );
});