import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/army-card";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { readFile } from 'fs/promises';
import path from 'path'
import type { Dump } from "~/models/GwAppInterfaces";
import { Spinner } from "~/components/spinner";

export const useArmies = routeLoader$(async () => {
    const filePath = `${path.resolve('./')}\\src\\routes\\data\\40k10e\\dump.json`;

    const file = await readFile(filePath, 'utf8');
    const data = JSON.parse(file) as Dump;

    return data.data.publication;
});

export default component$(() => {
    const armies = useArmies();

    if (armies === undefined || armies.value === undefined) return (<><Spinner /></>);

    return (
        <section class="dark:text-black fixed overflow-y-auto h-screen">
            <div class="flex flex-row flex-wrap gap-5 m-5">
            {armies.value.map((a) => 
                <Link href={`${a.id}`} key={a.id}>
                    <Card title={a.name} img={ {src: a.factionBackgroundImage, alt: a.name }} />
                </Link>
            )}
            </div>
        </section>
    );
});