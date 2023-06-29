import { server$ } from "@builder.io/qwik-city";
import { readFile } from "fs/promises";
import path from "path";
import type { Dump } from "~/models/GwAppInterfaces";

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

export const getDataSheetOptions =async (dataSheetId:string) => {
    const data = dataCache || await baseFile() || undefined;
    if (data === undefined) return undefined;

    return data.data.unit_composition.filter(f => f.datasheetId === dataSheetId);
}