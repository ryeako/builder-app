import { component$, $ } from "@builder.io/qwik";
import { HiMinusSolid, HiPlusSolid } from "@qwikest/icons/heroicons";
import type { IUnitCardProps } from "~/models/iunitCardProps";
import type { IUnitOption } from "~/models/iunitOption";
import type { IUnitOptionProps } from "~/models/iunitOptionProps";


export const UnitCard = component$<IUnitCardProps>(({ armyUnit, icon, onClick$ }) => {
    const name = armyUnit.name;
    const options = Array.isArray(armyUnit.options) ? armyUnit.options : [armyUnit.options];
    const unitClick = $((option: IUnitOption) => onClick$ ? onClick$({ name: name, options: [option] }) : undefined)

    return (
        <div class="block rounded-lg bg-white p-1 dark:bg-neutral-700 border-solid border-b-2 dark:border-white border-black m-1">
            <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {name}
            </h5>
            {  options ? 
            <ul class="text-neutral-600 dark:text-neutral-200">
                {options.map((o, i) => <UnitOption unitOptions={o} icon={icon} key={i} onClick$={unitClick} />)}
            </ul>
            : null}
        </div>
    );
});

export const UnitOption = component$<IUnitOptionProps>(({unitOptions, icon, onClick$}) => {
    const cloneUnitOptions = {...unitOptions};

    return (
        <li class="grid grid-flow-col grid-rows-1 bg-slate-700 items-center mb-1">
            <span>
                {`${unitOptions.models}....${unitOptions.points}pts`}
            </span>
            <div class="justify-self-end">
                <button onClick$={() => onClick$(cloneUnitOptions)} 
                    type="button" 
                    class="dark:bg-white p-2 dark:text-black text-lg w-auto font-bold bg-black items-center justify-center rounded-sm mx-2 my-auto">
                    { icon === "add" ? <HiPlusSolid /> : <HiMinusSolid /> }
                </button>
            </div>
        </li>
    )
});