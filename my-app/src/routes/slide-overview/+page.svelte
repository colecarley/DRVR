<script lang="ts">
    import { SlideModel } from "../../types/slide";
    import Center from "$lib/center.svelte";
    import Squeeze from "$lib/squeeze.svelte";
    import SlideCard from "$lib/slide-card.svelte";
    import { Card } from "flowbite-svelte";
    import Header from "$lib/header.svelte";

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
            "/slide-1.jpg",
            "Slide 3",
            "/slide-view/3",
            "2021-01-03",
            "Middle of the stomach.",
        ),
        new SlideModel(
            "/slide-1.jpg",
            "Slide 4",
            "/slide-view/4",
            "2021-01-04",
            "Left side of the stomach.",
        ),
        new SlideModel(
            "/slide-1.jpg",
            "Slide 5",
            "/slide-view/5",
            "2021-01-05",
            "Right side of the stomach.",
        ),
        new SlideModel(
            "/slide-1.jpg",
            "Slide 6",
            "/slide-view/6",
            "2021-01-06",
            "Middle of the stomach.",
        ),
        new SlideModel(
            "/slide-1.jpg",
            "Slide 7",
            "/slide-view/7",
            "2021-01-07",
            "Left side of the stomach.",
        ),
        new SlideModel(
            "/slide-1.jpg",
            "Slide 8",
            "/slide-view/8",
            "2021-01-08",
            "Right side of the stomach.",
        ),
        new SlideModel(
            "/slide-1.jpg",
            "Slide 9",
            "/slide-view/9",
            "2021-01-09",
            "Middle of the stomach.",
        ),
        new SlideModel(
            "/slide-1.jpg",
            "Slide 10",
            "/slide-view/10",
            "2021-01-10",
            "Left side of the stomach.",
        ),
        new SlideModel(
            "/slide-1.jpg",
            "Slide 11",
            "/slide-view/11",
            "2021-01-11",
            "Right side of the stomach.",
        ),
        new SlideModel(
            "/slide-1.jpg",
            "Slide 12",
            "/slide-view/12",
            "2021-01-12",
            "Middle of the stomach.",
        ),
        new SlideModel(
            "/slide-1.jpg",
            "Slide 13",
            "/slide-view/13",
            "2021-01-13",
            "Left side of the stomach.",
        ),
        new SlideModel(
            "/slide-1.jpg",
            "Slide 14",
            "/slide-view/14",
            "2021-01-14",
            "Right side of the stomach.",
        ),
    ];
</script>

<Center>
    <Header></Header>
    <Squeeze>
        <div class="grid grid-cols-3 gap-6 w-full p-12">
            {#each slides as slide}
                <SlideCard {slide} />
            {/each}
        </div>
    </Squeeze>
</Center>
