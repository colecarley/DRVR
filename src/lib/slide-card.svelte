<script lang="ts">
    import { Card } from "flowbite-svelte";
    import type { SlideModel } from "../types/slide";

    let {
        slide,
    }: {
        slide: SlideModel;
    } = $props();
</script>

<Card img={slide.image} class="shadow-lg shadow-primary-500 max-w-full">
    <p>{slide.title}</p>
    <p class="text-sm">{slide.date}</p>
    <p>{slide.description}</p>
</Card>
