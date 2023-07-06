import { component$, $, useResource$, Resource, useContext } from "@builder.io/qwik";
import { HiMinusSolid, HiPlusSolid } from "@qwikest/icons/heroicons";
import type { IUnitCardProps } from "~/models/iunitCardProps";
import type { IUnitOptionProps } from "~/models/iunitOptionProps";
import { getDataSheetOptions } from "~/services/40kServerCache";
import type { UnitCompositionExtended } from "~/services/40kServerCache";
import { Spinner } from "./spinner";
import { ArmyContext } from "~/routes/builder/[id]";
import { v4 as uuidv4 } from "uuid";


export const UnitCard = component$<IUnitCardProps>(({ armyUnit, dataSheet, unitComposition, icon, onClick$ }) => {
    const options =  useResource$(async () => unitComposition ? [unitComposition] : await getDataSheetOptions([dataSheet.id]));
    const armyContext = useContext(ArmyContext);
    const displayWarGear = armyUnit ? true : false;
    const unitClick = $((option: UnitCompositionExtended) => {
        // Keeping click event for future usage
        onClick$ ? onClick$(dataSheet, option) : undefined;

        switch (icon) {
            case 'add':
                armyContext.addUnit({ id: uuidv4(), dataSheet: dataSheet, unitComponent: option}); 
                break;
            case 'subtract':
                if (armyUnit) armyContext.removeUnit(armyUnit?.id);
                break;
            default:
                break;
        }
    });

    const unitOption = (unitCompositionExtended: UnitCompositionExtended) => {
        return (
            <UnitOption 
                unitOptions={unitCompositionExtended} 
                displayWarGear={displayWarGear}
                icon={icon} 
                key={unitCompositionExtended.id} 
                onClick$={unitClick} />
        );
    }

    return (
        <div class="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:flex-row">
            <img
                class="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" 
                src={dataSheet.bannerImage} alt={dataSheet.name} loading="lazy" />
                
            <div class="flex flex-col p-1 grow">
                <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {dataSheet.name}
                </h5>
                {  options ? 
                <ul class="text-neutral-600 dark:text-neutral-200">
                    <Resource
                        value={options}
                        onPending={() => <Spinner />}
                        onRejected={() => <p>Something failed</p>}
                        onResolved={(resOptions) => {
                            return (<> {
                                resOptions?.sort((a, b) => a.displayOrder - b.displayOrder).map((o) => unitOption(o))
                        }</>);
                        }} />
                </ul>
                : null}
            </div>
        </div>
    );
});

export const UnitOption = component$<IUnitOptionProps>(({unitOptions, displayWarGear, icon, onClick$}) => {
    const cloneUnitOptions = {...unitOptions};

    const warGearDisplay = () => {
        if (displayWarGear === undefined || displayWarGear === false) return null;
        return (
            <li>
                <div>
                    wargear
                </div>
            </li>
        )
    }

    return (
        <>
        <li class="grid grid-flow-col grid-rows-1 bg-slate-700 items-center mb-1">
            <span>
                {`${unitOptions.max} model${unitOptions.max === 1 ? "": "s"}......${unitOptions.points}pts`}
            </span>
            <div class="justify-self-end">
                <button onClick$={() => onClick$(cloneUnitOptions)} 
                    type="button" 
                    class="dark:bg-white p-2 dark:text-black text-lg w-auto font-bold bg-black items-center justify-center rounded-sm mx-2 my-auto">
                    { icon === "add" ? <HiPlusSolid /> : <HiMinusSolid /> }
                </button>
            </div>
        </li>
        {warGearDisplay()}
        </>
    )
});