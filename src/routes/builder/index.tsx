import { Resource, component$, useResource$, useSignal, $, useStore, useComputed$ } from "@builder.io/qwik";
import armies from './../data/40k10e/armies.json';
import { Card } from "~/components/army-card";
import type { ArmyUnit } from "~/components/unit-card";
import { UnitCard } from "~/components/unit-card";



export default component$(() => {
    const selectedArmy = useSignal<string>("");
    const armyOptions = useResource$<ArmyUnit[] | undefined>(async ({ track }) => {
        track(() => selectedArmy.value);

        if (selectedArmy.value === "") return undefined;
        const path = `/data/40k10e/${selectedArmy.value}`;

        const res = await fetch(path);
        const data = await res.json();

        return data as ArmyUnit[];
    });
    const armyUnits = useStore<ArmyUnit[]>([]);

    const addUnit = $((armySelect: ArmyUnit) => armyUnits.push(armySelect));
    const points = useComputed$(() => {
        if (armyUnits.length === -1) return 0;
        const clone = [...armyUnits];
        const points = clone.reduce((prev, curr) => {
            if (!Array.isArray(prev.options) && !Array.isArray(curr.options))
                return (prev.options.points + curr.options.points);
            return 0;
        });
        return points;
    });

    return (
        <section class="dark:text-black">
            <div class={[selectedArmy.value !== "" ? "hidden" : "", "flex flex-row flex-wrap gap-5 w-screen m-5"]}>
            {armies.map((a) => 
                <button type="button" key={a.id} onClick$={() => selectedArmy.value = a.id} class="p-0">
                    <Card title={a.name} img={ {src: a.url, alt: a.name }} isHighlighted={selectedArmy.value === a.id} />
                </button>
            )}
            </div>

            <h1>
                {points.value}
            </h1>

            <article class="grid grid-cols-2 gap-3 h-screen">
                <div>
                    <Resource 
                        value={armyOptions} 
                        onPending={() => <p>Loading</p>} 
                        onResolved={(ao) => ao?.map((units, i) => <UnitCard key={i} armyUnit={units} onClick$={addUnit} />)}
                        onRejected={() => <p>Nothing to see here; move along.</p>} />
                </div>
                <div class="border-solid border-white border-l-2">
                    {armyUnits ? armyUnits?.map((units, i) => <UnitCard key={i} armyUnit={units} />) : null}
                </div>
            </article>
        </section>
    );
});