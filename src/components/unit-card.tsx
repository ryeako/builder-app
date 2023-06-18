import type { PropFunction} from "@builder.io/qwik";
import { component$, $ } from "@builder.io/qwik";
import { HiPlusSolid } from "@qwikest/icons/heroicons";
import { IUnitCardProps } from "~/models/iunitCardProps";
import { IUnitOption } from "~/models/iunitOption";
import { IUnitOptionProps } from "~/models/iunitOptionProps";


export const UnitCard = component$<IUnitCardProps>(({ armyUnit, onClick$ }) => {
    const name = armyUnit.name;
    const options = Array.isArray(armyUnit.options) ? armyUnit.options : [armyUnit.options];
    const unitClick = $((option: IUnitOption) => onClick$ ? onClick$({ name: name, options: [option]  }) : undefined)

    return (
        <div class="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {name}
            </h5>
            {  options ? 
            <ul class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {options.map((o, i) => <UnitOption unitOptions={o}  key={i} onClick$={unitClick} />)}
            </ul>
            : null}
        </div>
    );
});

export const UnitOption = component$<IUnitOptionProps>(({unitOptions, onClick$}) => {
    const cloneUnitOptions = {...unitOptions};

    return (
        <li class="flex flex-row justify-between mb-2 p-3 bg-slate-700">
            <div>
                {`${unitOptions.models}....${unitOptions.points}pts`}
            </div>
            <button onClick$={() => onClick$(cloneUnitOptions)} type="button" class="dark:bg-white dark:text-black text-lg font-bold bg-black items-center justify-center rounded-sm mx-2 my-auto">
                <HiPlusSolid />
            </button>
        </li>
    )
});