import { component$ } from "@builder.io/qwik";
import armies from './../data/40k10e/armies.json';
import { Card } from "~/components/army-card";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <section class="dark:text-black fixed screen-adjust-width">
            <div class="flex flex-row flex-wrap gap-5 m-5">
            {armies.map((a) => 
                <Link href={`${a.id}`} key={a.id}>
                    <Card title={a.name} img={ {src: a.url, alt: a.name }} />
                </Link>
            )}
            </div>
        </section>
    );
});