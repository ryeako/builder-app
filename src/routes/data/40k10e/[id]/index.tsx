import { RequestHandler } from "@builder.io/qwik-city";
import fs from 'fs';
import path from 'path'

export const onGet: RequestHandler = async ({params, json}) => {
    if (params.id === "") return json(204, {});
    const filePath = `${path.resolve('./')}\\src\\routes\\data\\40k10e\\[id]\\${params.id}.json`;

    try {
        const file = fs.readFileSync(filePath);
        const data = JSON.parse(file.toString());

        return json(200, data);
    } catch (error) {
        console.log('file missing', error);
    }
    
    json(204, {})
}