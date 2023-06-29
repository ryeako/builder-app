import { component$, $, useResource$, Resource } from "@builder.io/qwik";
import { HiMinusSolid, HiPlusSolid } from "@qwikest/icons/heroicons";
import type { UnitComposition } from "~/models/GwAppInterfaces";
import type { IUnitCardProps } from "~/models/iunitCardProps";
import type { IUnitOptionProps } from "~/models/iunitOptionProps";
import { getDataSheetOptions } from "~/services/40kServerCache";
import { Spinner } from "./spinner";


export const UnitCard = component$<IUnitCardProps>(({ armyUnit, setOption, icon, onClick$ }) => {
    const name = armyUnit.name;
    const options =  useResource$(async () => setOption ? [setOption] : await getDataSheetOptions(armyUnit.id));
    const unitClick = $((option: UnitComposition) => onClick$ ? onClick$(armyUnit, option) : undefined)

    return (
        <div class="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:flex-row">
            <img
                class="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" 
                src={armyUnit.bannerImage} alt={armyUnit.name} loading="lazy" />
                
            <div class="flex flex-col p-1 grow">
                <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {name}
                </h5>
                {  options ? 
                <ul class="text-neutral-600 dark:text-neutral-200">
                    <Resource
                        value={options}
                        onPending={() => <Spinner />}
                        onRejected={() => <p>Something failed</p>}
                        onResolved={(resOptions) => {
                            return (resOptions?.map((o) => 
                                <UnitOption unitOptions={o} icon={icon} key={o.id} onClick$={unitClick} />
                            ));
                        }} />
                </ul>
                : null}
            </div>
        </div>
    );
});

export const UnitOption = component$<IUnitOptionProps>(({unitOptions, icon, onClick$}) => {
    const cloneUnitOptions = {...unitOptions};

    return (
        <li class="grid grid-flow-col grid-rows-1 bg-slate-700 items-center mb-1">
            <span>
                {`${unitOptions.points}pts`}
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