import type { RequestHandler } from "@builder.io/qwik-city";
import fs from 'fs';
import path from 'path'
import type { IArmy } from "~/models/iarmy";

export const onGet: RequestHandler = async ({params, json}) => {
    try {
        return json(200, GetArmy(params.id));
    } catch (error) {
        console.log('file missing', error);
    }
    
    json(204, {})
}

export const GetArmy = (id: string): IArmy | undefined => {
    if (id === "") return undefined;
    const filePath = `${path.resolve('./')}\\src\\routes\\data\\40k10e\\armies.json`;

    try {
        const file = fs.readFileSync(filePath);
        const data = JSON.parse(file.toString());

        return data.find((f: IArmy) => f.id === id) as IArmy
    } catch (error) {
        console.log('file missing', error);
    }
    
    return undefined;
}