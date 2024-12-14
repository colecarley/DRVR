<!-- 
    This file is a part of the Slide Overview page.
    It displays all the slides in a grid.
  -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import Center from "$lib/center.svelte";
    import Header from "$lib/header.svelte";
    import Overview from "$lib/overview.svelte";
    import { Label, Range } from "flowbite-svelte";

    // state to control the number of columns in the grid
    let cols = $state(3);
</script>

<Center>
    <Header></Header>
    <div class="w-fit px-12 p-4 self-end">
        <Label class="text-white">{cols} Columns</Label>
        <Range
            bind:value={cols}
            min="3"
            max="8"
            onchange={() => {
                const container = document.getElementById("slide-container");
                if (container) {
                    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
                }
            }}
        />
    </div>
    <Overview
        bind:cols
        onchoose={(slide) => {
            localStorage.setItem("imagePaths", JSON.stringify([slide.image]));
            goto("/slide-view/");
        }}
    />
</Center>
