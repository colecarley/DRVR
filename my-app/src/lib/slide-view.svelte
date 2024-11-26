<script lang="ts">
    import { BottomNav, BottomNavItem, Button } from "flowbite-svelte";
    import {
        PenOutline,
        PenSolid,
        WandMagicSparklesOutline,
        ZoomInOutline,
        ZoomOutOutline,
    } from "flowbite-svelte-icons";
    import { onDestroy, onMount } from "svelte";

    let {
        imagePath,
    }: {
        imagePath: string;
    } = $props();

    let innerWidth = $state(0);
    let outerWidth = $state(0);
    let innerHeight = $state(0);
    let outerHeight = $state(0);

    let zoomAmount = 1;
    function resizeCanvas(zoomFactor: number) {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            zoomAmount = zoomAmount * zoomFactor;

            canvas.width = img.width * zoomAmount;
            canvas.height = img.height * zoomAmount;

            ctx.drawImage(
                img,
                0,
                0,
                img.width * zoomAmount,
                img.height * zoomAmount,
            );
            ctx.fillStyle = "red";

            restoreDrawings();
        };
    }

    onMount(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "red";
        };
    });

    function zoomIn() {
        console.log("zoom in");
        resizeCanvas(2);
    }

    function zoomOut() {
        console.log("zoom out");
        resizeCanvas(0.5);
    }

    type Positions = {
        x: number;
        y: number;
    };

    const positions: Positions = {
        x: 0,
        y: 0,
    };

    let penOn = $state(false);
    let drawing = false;

    const drawings: {
        position: Positions;
        height: number;
        width: number;
    }[] = [];

    function draw() {
        console.log("drawing at", positions.x, positions.y);
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        ctx.beginPath();
        ctx.arc(positions.x, positions.y, 5 * zoomAmount, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        drawings.push({
            position: {
                x: positions.x,
                y: positions.y,
            },
            height: canvas.height,
            width: canvas.width,
        });
    }

    function restoreDrawings() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        drawings.forEach((drawing) => {
            ctx.beginPath();
            ctx.arc(
                drawing.position.x * (canvas.width / drawing.width),
                drawing.position.y * (canvas.height / drawing.height),
                5 * zoomAmount,
                0,
                2 * Math.PI,
            );
            ctx.fill();
            ctx.closePath();
        });
    }
</script>

<svelte:window
    bind:innerWidth
    bind:outerWidth
    bind:innerHeight
    bind:outerHeight
/>

<div class="overflow-auto h-full w-full">
    <div class="flex justify-center items-center h-full">
        <canvas
            id="canvas"
            class="cursor-crosshair active:cursor-pointer absolute"
            onmousemove={(e) => {
                positions.x = e.offsetX;
                positions.y = e.offsetY;

                if (drawing && penOn) {
                    draw();
                }
            }}
            onmousedown={() => {
                console.log("moiuse down");
                drawing = true;
            }}
            onmouseup={() => {
                console.log("moise up");
                drawing = false;
            }}
        ></canvas>
    </div>
</div>
<BottomNav
    classInner="grid grid-cols-3 bg-white bg-opacity-70"
    activeUrl="/"
    id="bottom-nav"
    classOuter="bg-transparent border-none"
>
    <BottomNavItem onclick={zoomIn}>
        <ZoomInOutline class="w-6 h-6 text-primary-900 " />
    </BottomNavItem>
    <BottomNavItem onclick={zoomOut}>
        <ZoomOutOutline class="w-6 h-6 text-primary-900 " />
    </BottomNavItem>
    <BottomNavItem
        onclick={() => {
            penOn = !penOn;
        }}
    >
        {#if penOn}
            <PenSolid class="w-6 h-6 text-primary-900 " />
        {:else}
            <PenOutline class="w-6 h-6 text-primary-900" />
        {/if}
    </BottomNavItem>
</BottomNav>
