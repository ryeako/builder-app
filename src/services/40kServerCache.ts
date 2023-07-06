import { server$ } from "@builder.io/qwik-city";
import { readFile } from "fs/promises";
import path from "path";
import type { Dump, UnitComposition } from "~/models/GwAppInterfaces";

let dataCache: Dump | undefined = undefined;

export const baseFile = server$(async (forceRefresh: boolean = false) => {
    if (forceRefresh === false && dataCache) return dataCache;
    
    const filePath = `${path.resolve('./')}\\src\\routes\\data\\40k10e\\dump.json`;
    const file = await readFile(filePath, 'utf8');
    const data = JSON.parse(file) as Dump;

    dataCache = data;

    return data;
});

export const getArmies = async () => {
    const data = dataCache || await baseFile() || undefined;
    if (data === undefined) return undefined;

    return data.data.publication;
}

export const getArmy = async (id: string) => {
    const data = dataCache || await baseFile() || undefined;
    if (data === undefined) return undefined;

    return data.data.publication.find(f => f.id === id);
}

export const getDataSheets =async (publicationId:string) => {
    const data = dataCache || await baseFile() || undefined;
    if (data === undefined) return undefined;

    return data.data.datasheet.filter(f => f.publicationId === publicationId);
}

export interface UnitCompositionExtended extends UnitComposition {
    min: number,
    max: number
}

export const getDataSheetOptions =async (dataSheets:string[]) => {
    const data = dataCache || await baseFile() || undefined;
    if (data === undefined) return undefined;

    const dataSheetOptions = data.data.unit_composition.filter(f => dataSheets.some(s => f.datasheetId === s));
    const baseMiniatures = data.data.miniature.filter(f => dataSheets.some(s => s === f.datasheetId));
    const dataSheetMinis = data.data.unit_composition_miniature.filter(f => dataSheetOptions.some(s => s.id === f.unitCompositionId));

    const dataFinalized = dataSheetOptions.map(m => {
        const miniature = baseMiniatures.filter(f => f.datasheetId === m.datasheetId);
        // Units that have squad leaders separated
        const minaturesDisplay = miniature.find(f => f.statlineHidden === false); 
        const minis = dataSheetMinis.find(f => f.unitCompositionId === m.id && f.miniatureId === minaturesDisplay?.id);

        let max = minis?.max || 0;
        if (miniature.length > 1) {
            max = dataSheetMinis
                .filter(f => f.unitCompositionId === m.id && miniature.some(s => f.miniatureId === s.id))
                .reduce((acc, curr) => acc + curr.max , 0);
        }

        return {min: minis?.min || 0, max: max, ...m} as UnitCompositionExtended;
    });

    return dataFinalized;
}

