import type { RequestHandler } from "@builder.io/qwik-city";
import fs from 'fs';
import path from 'path'
import type { IArmyUnit } from "~/models/iarmyUnit";

export const onGet: RequestHandler = async ({params, json}) => {
    try {
        return json(200, GetUnitDetail(params.id));
    } catch (error) {
        console.log('file missing', error);
    }
    
    json(204, {})
}

export const GetUnitDetail = (id: string): IArmyUnit[] => {
    if (id === "") return []
    const filePath = `${path.resolve('./')}\\src\\routes\\data\\40k10e\\[id]\\${id}.json`;

    try {
        const file = fs.readFileSync(filePath);
        const data = JSON.parse(file.toString());

        return data as IArmyUnit[];
    } catch (error) {
        console.log('file missing', error);
    }
    return [];
}
