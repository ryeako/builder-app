import { Slot, component$ } from "@builder.io/qwik";

export const Content = component$(() => {
    return (
      <main class="fixed top-0 left-16 h-screen z-0 w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white">
        <Slot />
      </main>
    );
});