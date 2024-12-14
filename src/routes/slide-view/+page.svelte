<!-- 
    This is the slide view page. It displays a grid of slides with an image and a close button.
    It also handles the keyboard shortcuts for adding a new slide view.
  -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import Overview from "$lib/overview.svelte";
    import SlideView from "$lib/slide-view.svelte";
    import { Button, Modal } from "flowbite-svelte";
    import { CloseOutline } from "flowbite-svelte-icons";
    import { onMount } from "svelte";

    // state to control the new slide modal
    let newSlide: boolean = $state(false);
    let imagePaths: string[] = $state([]);

    // this hook runs when the component is mounted
    // it loads the image paths from local storage
    onMount(() => {
        const paths = localStorage.getItem("imagePaths");
        if (paths) {
            imagePaths = JSON.parse(paths);
        }
        $effect(() => {
            if (imagePaths.length == 0) {
                goto("/slide-overview");
            }
        });
    });

    let Meta = false;
</script>

<svelte:window
    onkeydown={(e) => {
        if (e.key == "Meta") {
            Meta = true;
        } else if (e.key == "\\" && Meta) {
            newSlide = true;
        }
    }}
    onkeyup={(e) => {
        if (e.key == "Meta") {
            Meta = false;
        }
    }}
/>
{#if imagePaths?.length}
    <div class="grid grid-cols-{imagePaths.length} w-full h-full">
        {#each imagePaths as imagePath, i}
            <div class="relative">
                <div class="z-50 absolute top-0 right-0">
                    <Button
                        class="bg-transparent focus-within:ring-0 hover:bg-primary-100 hover:opacity-70"
                        onclick={() => {
                            imagePaths.splice(i, 1);
                        }}
                    >
                        <CloseOutline class="w-6 h-6 text-primary-400 " />
                    </Button>
                </div>
                <SlideView {imagePath} />
            </div>
        {/each}
    </div>
{/if}

<Modal bind:open={newSlide} size="xl">
    <Overview
        cols={3}
        onchoose={(slide) => {
            imagePaths.push(slide.image);
            newSlide = false;
        }}
    />
</Modal>
