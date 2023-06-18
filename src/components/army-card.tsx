import { component$ } from "@builder.io/qwik";

export interface CardProps {
    title: string,
    text?: string,
    isHighlighted?: boolean;
    img?: {
        src: string,
        alt: string,
    }
}

export const Card = component$<CardProps>(({ title, text, img, isHighlighted: isSelected } : CardProps) => {
    const primaryStyle = "block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700";

    return (
    <div class={[primaryStyle, isSelected === true ? 'border-solid border-2 border-black dark:border-white' : '']}>
        { img ? <img class="rounded-t-lg" src={img?.src} alt={img?.alt} loading="lazy" /> : null }
        <div class="p-6">
            <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {title}
            </h5>
            { text ?
            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
            </p> : null
            }
        </div>
    </div>);
})