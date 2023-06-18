import { component$, useSignal, useComputed$, useVisibleTask$, $ } from "@builder.io/qwik";
import { SiAboutdotme } from "@qwikest/icons/simpleicons";
import { HiHomeSolid, HiMapSolid, HiBoltSolid, HiBoltOutline, HiCalculatorSolid } from "@qwikest/icons/heroicons"
import { Link } from "@builder.io/qwik-city";

const routes = [
    { icon: HiHomeSolid, text: "Home", route: '/' },
    { icon: HiCalculatorSolid, text: "Builder", route: '/builder' },
    { icon: SiAboutdotme, text:"About", route: '/about' },
    { icon: HiMapSolid, text: "OSE", route: '/ose/treasure'}
];

export const MainNav = component$(() => {
    const isDark = useSignal(true);    
    const modeDisplay = useComputed$(() => isDark.value ? 'Dark' : 'Light');

    useVisibleTask$(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            isDark.value = true;
        } else {
            document.documentElement.classList.remove('dark')
            isDark.value = false;
        }
    });

    const onClick = $(() => {
        isDark.value = !isDark.value;
        if (isDark.value) {
            document.documentElement.classList.add('dark')
            localStorage.theme = 'dark';
        }
        else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    });

    return(
    <nav class="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col justify-between bg-gray-300 dark:bg-gray-900 dark:text-white shadow-lg z-10">
        <div class='justify-start'>
            {routes.map((r,i) => 
                <Link href={r.route} key={i}>
                    <div class="sidebar-icon group">
                        <span><r.icon /></span>
                        <span class="sidebar-tooltip group-hover:scale-100">{r.text}</span>
                    </div>
                </Link>
            )}
        </div>
        <div class="justify-self-end">
            <div class="sidebar-icon group" onClick$={onClick}>
                {isDark.value ? <HiBoltSolid /> : <HiBoltOutline />}
                <span class="sidebar-tooltip group-hover:scale-100">{modeDisplay.value}</span>
            </div>
        </div>
    </nav>);
});