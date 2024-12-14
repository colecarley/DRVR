<script lang="ts">
    import { Button, Modal, Textarea } from "flowbite-svelte";
    import {
        MessagesOutline,
        PenOutline,
        PenSolid,
        RedoOutline,
        UndoOutline,
        ZoomInOutline,
        ZoomOutOutline,
    } from "flowbite-svelte-icons";

    let {
        imagePath,
    }: {
        imagePath: string;
    } = $props();

    $effect(() => {
        if (imagePath) {
            redrawMinimap();
            resizeCanvas(1);
        }
    });

    let modal = $state(false);
    let note: string = $state("");

    let outerHeight = $state(0);
    let outerWidth = $state(0);

    let zoomAmount = 1;
    let canvasRef: HTMLCanvasElement;
    let ctxRef: CanvasRenderingContext2D;
    let miniMapRef: HTMLCanvasElement;
    let miniMapCtxRef: CanvasRenderingContext2D;

    let leftPosition = 0;
    let topPosition = 0;
    function resizeCanvas(zoomFactor: number) {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            zoomAmount = zoomAmount * zoomFactor;

            canvasRef.width = img.width * zoomAmount;
            canvasRef.height = img.height * zoomAmount;

            ctxRef.clearRect(0, 0, canvasRef.width, canvasRef.height);
            ctxRef.drawImage(
                img,
                0,
                0,
                img.width * zoomAmount,
                img.height * zoomAmount,
            );
            ctxRef.fillStyle = "red";

            restoreDrawings();
        };
    }

    function redrawMinimap() {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            miniMapRef.width = img.width / 5;
            miniMapRef.height = img.height / 5;

            miniMapCtxRef.clearRect(0, 0, miniMapRef.width, miniMapRef.height);
            miniMapCtxRef.drawImage(img, 0, 0, img.width / 5, img.height / 5);

            miniMapCtxRef.strokeStyle = "red";

            const canvasTop = topPosition;
            const canvasBottom = topPosition + canvasRef.height;

            const canvasLeft = leftPosition;
            const canvasRight = leftPosition + canvasRef.width;

            const isHeightInFrame = canvasTop < 0 && canvasBottom > outerHeight;
            const isWidthInFrame = canvasLeft < 0 && canvasRight > outerWidth;

            const viewHeight = isHeightInFrame
                ? miniMapRef.height
                : ((outerHeight - topPosition) / outerHeight) *
                  miniMapRef.height;

            const viewWidth = isWidthInFrame
                ? miniMapRef.width
                : ((outerWidth - leftPosition) / outerWidth) * miniMapRef.width;

            miniMapCtxRef.strokeRect(0, 0, viewWidth, viewHeight);
        };
    }

    function zoomIn() {
        resizeCanvas(1.01);
        redrawMinimap();
    }

    function zoomOut() {
        resizeCanvas(0.99);
        redrawMinimap();
    }

    type Positions = {
        x: number;
        y: number;
    };

    const positions: Positions = {
        x: 0,
        y: 0,
    };

    const startPositions: Positions = {
        x: 0,
        y: 0,
    };

    let penOn = $state(false);
    let mouseDown = false;

    type Drawing = {
        position: Positions;
        leftPosition: number;
        topPosition: number;
        height: number;
        width: number;
    };

    const drawings: Drawing[] = [];
    const undos: Drawing[] = [];

    function draw() {
        ctxRef.beginPath();
        ctxRef.arc(positions.x, positions.y, 5 * zoomAmount, 0, 2 * Math.PI);
        ctxRef.fill();
        ctxRef.closePath();

        drawings.push({
            position: {
                x: positions.x,
                y: positions.y,
            },
            leftPosition: leftPosition,
            topPosition: topPosition,
            height: canvasRef.height,
            width: canvasRef.width,
        });
    }

    function move() {
        canvasRef.style.left = `${(leftPosition += positions.x - startPositions.x)}px`;
        canvasRef.style.top = `${(topPosition += positions.y - startPositions.y)}px`;

        redrawMinimap();
    }

    function restoreDrawings() {
        drawings.forEach((drawing) => {
            ctxRef.beginPath();
            ctxRef.arc(
                drawing.position.x * (canvasRef.width / drawing.width),
                drawing.position.y * (canvasRef.height / drawing.height),
                5 * zoomAmount,
                0,
                2 * Math.PI,
            );
            ctxRef.fill();
            ctxRef.closePath();
        });
    }

    let intervalId: number;

    function loadMinimap(canvas: HTMLCanvasElement) {
        miniMapRef = canvas as HTMLCanvasElement;
        const context = canvas.getContext("2d");
        if (!context) {
            return;
        }

        miniMapCtxRef = context;
        redrawMinimap();
    }

    function loadCanvas(canvas: HTMLCanvasElement) {
        canvasRef = canvas as HTMLCanvasElement;
        const context = canvas.getContext("2d");
        if (!context) {
            return;
        }

        ctxRef = context;
        resizeCanvas(1);
    }
</script>

<svelte:window bind:outerHeight bind:outerWidth />
<div class="overflow-hidden w-full h-full">
    <div class="relative">
        <Modal title="Notes" bind:open={modal}>
            <Textarea bind:value={note} cols={10}></Textarea>
            <svelte:fragment slot="footer">
                <div class="w-full flex justify-end">
                    <Button
                        onclick={() => {
                            modal = false;
                        }}>Save</Button
                    >
                </div>
            </svelte:fragment>
        </Modal>

        <div class="bg-white absolute z-10">
            <canvas use:loadMinimap></canvas>
        </div>

        <div class="overflow-auto h-full w-full">
            <canvas
                use:loadCanvas
                class="cursor-crosshair active:cursor-pointer absolute"
                onmousemove={(e) => {
                    positions.x = e.offsetX;
                    positions.y = e.offsetY;

                    if (mouseDown) {
                        if (penOn) {
                            requestAnimationFrame(draw);
                        } else {
                            requestAnimationFrame(move);
                        }
                    }
                }}
                onmousedown={() => {
                    mouseDown = true;
                    startPositions.x = positions.x;
                    startPositions.y = positions.y;
                }}
                onmouseup={() => {
                    mouseDown = false;
                }}
                onmouseleave={() => {
                    mouseDown = false;
                }}
            ></canvas>
        </div>
    </div>
    <div class="absolute z-20 bottom-0">
        <div class="bg-opacity-70 grid grid-cols-6">
            <Button
                class="bg-transparent focus-within:ring-0 hover:bg-primary-100 hover:opacity-70transparent"
                onmousedown={() => {
                    intervalId = setInterval(zoomIn, 10);
                }}
                onmouseup={() => {
                    clearInterval(intervalId);
                }}
                onmouseleave={() => {
                    clearInterval(intervalId);
                }}
            >
                <ZoomInOutline class="w-6 h-6 text-primary-400 " />
            </Button>
            <Button
                class="bg-transparent focus-within:ring-0 hover:bg-primary-100 hover:opacity-70transparent"
                onmousedown={() => {
                    intervalId = setInterval(zoomOut, 10);
                }}
                onmouseup={() => {
                    clearInterval(intervalId);
                }}
                onmouseleave={() => {
                    clearInterval(intervalId);
                }}
            >
                <ZoomOutOutline class="w-6 h-6 text-primary-400 " />
            </Button>
            <Button
                class="bg-transparent focus-within:ring-0 hover:bg-primary-100 hover:opacity-70transparent"
                onclick={() => {
                    penOn = !penOn;
                }}
            >
                {#if penOn}
                    <PenSolid class="w-6 h-6 text-primary-400 " />
                {:else}
                    <PenOutline class="w-6 h-6 text-primary-400" />
                {/if}
            </Button>
            <Button
                class="bg-transparent focus-within:ring-0 hover:bg-primary-100 hover:opacity-70transparent"
                onmousedown={() => {
                    intervalId = setInterval(() => {
                        const drawing = drawings.pop();
                        if (!drawing) {
                            return;
                        }
                        undos.push(drawing);
                        resizeCanvas(1);
                    }, 10);
                }}
                onmouseup={() => {
                    clearInterval(intervalId);
                }}
                onmouseleave={() => {
                    clearInterval(intervalId);
                }}
            >
                <UndoOutline class="w-6 h-6 text-primary-400" />
            </Button>
            <Button
                class="bg-transparent focus-within:ring-0 hover:bg-primary-100 hover:opacity-70transparent"
                onmousedown={() => {
                    intervalId = setInterval(() => {
                        const drawing = undos.pop();
                        if (!drawing) {
                            return;
                        }
                        drawings.push(drawing);
                        resizeCanvas(1);
                    }, 10);
                }}
                onmouseup={() => {
                    clearInterval(intervalId);
                }}
                onmouseleave={() => {
                    clearInterval(intervalId);
                }}
            >
                <RedoOutline class="w-6 h-6 text-primary-400" />
            </Button>
            <Button
                class="bg-transparent focus-within:ring-0 hover:bg-primary-100 hover:opacity-70transparent"
                onclick={() => {
                    modal = true;
                }}
            >
                <MessagesOutline class="w-6 h-6 text-primary-400"
                ></MessagesOutline>
            </Button>
        </div>
    </div>
</div>
