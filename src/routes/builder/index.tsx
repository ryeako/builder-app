import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/army-card";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { Spinner } from "~/components/spinner";
import { getArmies } from "~/services/40kServerCache";

export const useArmies = routeLoader$(async () => {
    return getArmies();
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