<script lang="ts">
    import CaseCard from "$lib/case-card.svelte";
    import Center from "$lib/center.svelte";
    import Squeeze from "$lib/squeeze.svelte";
    import { BottomNav, BottomNavItem, Button } from "flowbite-svelte";
    import { CaseModel, type Case } from "../../types/case";
    import { PlusOutline } from "flowbite-svelte-icons";
    import { goto } from "$app/navigation";

    const cases: CaseModel[] = [
        new CaseModel("Case 1", "slide-overview", "2021-01-01"),
        new CaseModel("Case 2", "slide-overview", "2021-01-02"),
        new CaseModel("Case 3", "slide-overview", "2021-01-03"),
    ];
</script>

<Center>
    <Squeeze>
        <div class="p-12">
            <div class="w-full justify-between flex">
                <h1 class="text-primary-50">Cases</h1>
                <Button
                    class="mb-12"
                    onclick={() => {
                        goto("/upload-case");
                    }}>Add Case</Button
                >
            </div>
            <div class="grid grid-cols-2 w-full gap-6">
                {#each cases as c}
                    <CaseCard {c} />
                {/each}
            </div>
        </div>
    </Squeeze>
</Center>
