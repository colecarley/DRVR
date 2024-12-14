<!-- 
    This is the page that displays all cases.
    It uses the CaseCard component to display each case.
    It also has a button to add a new case, which opens a modal with a file upload.
  -->
<script lang="ts">
    import CaseCard from "$lib/case-card.svelte";
    import Center from "$lib/center.svelte";
    import Header from "$lib/header.svelte";
    import Squeeze from "$lib/squeeze.svelte";
    import { Button, Fileupload, Modal } from "flowbite-svelte";
    import { PlusOutline } from "flowbite-svelte-icons";
    import { CaseModel } from "../../types/case";

    // the cases to display
    const cases: CaseModel[] = [
        new CaseModel("Case 1", "slide-overview", "2021-01-01"),
        new CaseModel("Case 2", "slide-overview", "2021-01-02"),
        new CaseModel("Case 3", "slide-overview", "2021-01-03"),
    ];

    // state to control the modal
    let showAddCase = $state(false);
</script>

<Center>
    <Header></Header>
    <Squeeze>
        <div class="p-12">
            <div class="w-full justify-between flex">
                <h1 class="text-primary-50">Cases</h1>
                <Button
                    class="mb-12 flex justify-between gap-2"
                    onclick={() => {
                        showAddCase = true;
                    }}
                    >Add Case
                    <PlusOutline class="w-6 h-6" />
                </Button>
            </div>
            <div class="grid grid-cols-2 w-full gap-6">
                {#each cases as c}
                    <CaseCard {c} />
                {/each}
            </div>
        </div>
    </Squeeze>
</Center>

<Modal bind:open={showAddCase} title="Upload Case" autoclose>
    <div class="flex flex-col gap-6">
        <Fileupload />

        <div class="flex justify-end gap-3">
            <Button>Cancel</Button>
            <Button>Upload</Button>
        </div>
    </div>
</Modal>
