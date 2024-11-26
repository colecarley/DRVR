<script>
    import Center from "$lib/center.svelte";
    import Squeeze from "$lib/squeeze.svelte";
    import { Button, Card, Fileupload } from "flowbite-svelte";
</script>

<Center>
    <Squeeze>
        <div class="flex flex-col h-full justify-center items-center">
            <Card class="shadow-lg shadow-primary-500">
                <h1 class="mb-6">Upload Case</h1>
                <div class="flex flex-col gap-6">
                    <Fileupload />

                    <div class="flex justify-end gap-3">
                        <Button>Cancel</Button>
                        <Button>Upload</Button>
                    </div>
                </div>
            </Card>
        </div>
    </Squeeze>
</Center>
