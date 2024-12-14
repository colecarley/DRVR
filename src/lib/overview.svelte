<!-- 
    This is the overview component that displays all the slides in a grid.
    It uses the SlideCard component to display each slide.
    The number of columns in the grid can be set using the cols prop.
  -->

<script lang="ts">
    import { SlideModel } from "../types/slide";
    import SlideCard from "./slide-card.svelte";

    // the props for the component
    let {
        cols = $bindable(3),
        onchoose,
    }: { cols: number; onchoose: (slide: SlideModel) => void } = $props();

    // the list of slides to display
    const slides: SlideModel[] = [
        new SlideModel(
            "/slide-1.jpg",
            "Slide 1",
            "/slide-view/1",
            "2021-01-01",
            "Left side of the stomach.",
        ),
        new SlideModel(
            "/slide-2.jpg",
            "Slide 2",
            "/slide-view/2",
            "2021-01-02",
            "Right side of the stomach.",
        ),
        new SlideModel(
            "/slide-3.jpg",
            "Slide 3",
            "/slide-view/3",
            "2021-01-03",
            "Middle of the stomach.",
        ),
        new SlideModel(
            "/slide-4.jpg",
            "Slide 4",
            "/slide-view/4",
            "2021-01-04",
            "Left side of the kidney.",
        ),
        new SlideModel(
            "/slide-5.jpg",
            "Slide 5",
            "/slide-view/5",
            "2021-01-05",
            "Right side of the kidney.",
        ),
        new SlideModel(
            "/slide-6.jpg",
            "Slide 6",
            "/slide-view/6",
            "2021-01-06",
            "Middle of the ovary.",
        ),
        new SlideModel(
            "/slide-7.jpg",
            "Slide 7",
            "/slide-view/7",
            "2021-01-07",
            "Left side of the ovary.",
        ),
        new SlideModel(
            "/slide-8.jpg",
            "Slide 8",
            "/slide-view/8",
            "2021-01-08",
            "Right side of the ovary.",
        ),
        new SlideModel(
            "/slide-1.jpg",
            "Slide 1",
            "/slide-view/1",
            "2021-01-01",
            "Left side of the stomach.",
        ),
        new SlideModel(
            "/slide-2.jpg",
            "Slide 2",
            "/slide-view/2",
            "2021-01-02",
            "Right side of the stomach.",
        ),
        new SlideModel(
            "/slide-3.jpg",
            "Slide 3",
            "/slide-view/3",
            "2021-01-03",
            "Middle of the stomach.",
        ),
        new SlideModel(
            "/slide-4.jpg",
            "Slide 4",
            "/slide-view/4",
            "2021-01-04",
            "Left side of the kidney.",
        ),
        new SlideModel(
            "/slide-5.jpg",
            "Slide 5",
            "/slide-view/5",
            "2021-01-05",
            "Right side of the kidney.",
        ),
        new SlideModel(
            "/slide-6.jpg",
            "Slide 6",
            "/slide-view/6",
            "2021-01-06",
            "Middle of the ovary.",
        ),
        new SlideModel(
            "/slide-7.jpg",
            "Slide 7",
            "/slide-view/7",
            "2021-01-07",
            "Left side of the ovary.",
        ),
        new SlideModel(
            "/slide-8.jpg",
            "Slide 8",
            "/slide-view/8",
            "2021-01-08",
            "Right side of the ovary.",
        ),
    ];
</script>

<div class="grid grid-cols-{cols} gap-6 w-full p-12" id="slide-container">
    {#each slides as s}
        <button onclick={() => onchoose(s)}>
            <SlideCard slide={s} />
        </button>
    {/each}
</div>
