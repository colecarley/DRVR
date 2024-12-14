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
    let mouseDown = $state(false);

    $effect(() => {
        penOn;
        if (drawing.length == 0) return;

        drawings.push(drawing);
        drawing = [];
    });

    type Marking = {
        position: Positions;
        leftPosition: number;
        topPosition: number;
        height: number;
        width: number;
    };

    type Drawing = Marking[];

    const drawings: Drawing[] = [];
    const undos: Drawing[] = [];

    let drawing: Drawing = [];
    function draw() {
        ctxRef.beginPath();
        ctxRef.arc(positions.x, positions.y, 5 * zoomAmount, 0, 2 * Math.PI);
        ctxRef.fill();
        ctxRef.closePath();

        drawing.push({
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
        drawings.forEach((drawing) =>
            drawing.forEach((marking) => {
                ctxRef.beginPath();
                ctxRef.arc(
                    marking.position.x * (canvasRef.width / marking.width),
                    marking.position.y * (canvasRef.height / marking.height),
                    5 * zoomAmount,
                    0,
                    2 * Math.PI,
                );
                ctxRef.fill();
                ctxRef.closePath();
            }),
        );
    }

    function undo() {
        if (!windowActive) return;
        const drawing = drawings.pop();
        if (!drawing) {
            return;
        }
        undos.push(drawing);
        resizeCanvas(1);
    }

    function redo() {
        if (!windowActive) return;
        const drawing = undos.pop();
        if (!drawing) {
            return;
        }
        drawings.push(drawing);
        resizeCanvas(1);
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

    let meta = false;
    let shift = false;
    let windowActive = false;
</script>

<svelte:window
    bind:outerHeight
    bind:outerWidth
    onkeydown={(e) => {
        if (e.key == "Meta") {
            meta = true;
        } else if (e.key == "Shift") {
            shift = true;
        } else if (e.key == "z" && meta) {
            if (shift) {
                redo();
            } else {
                undo();
            }
        }
        if (e.code == "Space") {
            penOn = true;
        }
    }}
    onkeyup={(e) => {
        if (e.key == "Meta") {
            meta = false;
        }
        if (e.key == "Shift") {
            shift = false;
        }
        if (e.code == "Space") {
            penOn = false;
        }
    }}
/>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="overflow-hidden w-full h-full"
    onmouseenter={() => {
        windowActive = true;
    }}
    onmouseleave={() => {
        windowActive = false;
    }}
    onwheel={(e) => {
        e.deltaY > 0
            ? requestAnimationFrame(() => resizeCanvas(0.95))
            : requestAnimationFrame(() => resizeCanvas(1.05));
    }}
>
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
                            draw();
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
                    if (penOn) {
                        drawings.push(drawing);
                        drawing = [];
                    }

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
                onmousedown={undo}
            >
                <UndoOutline class="w-6 h-6 text-primary-400" />
            </Button>
            <Button
                class="bg-transparent focus-within:ring-0 hover:bg-primary-100 hover:opacity-70transparent"
                onmousedown={redo}
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
