<script lang="ts">
    import { Button, Card } from "flowbite-svelte";
    import { FolderOutline } from "flowbite-svelte-icons";
    import type { Case } from "../types/case";
    import { formatDate } from "../helpers/format-date";
    let {
        c,
    }: {
        c: Case;
    } = $props();
</script>

<Card href={c.href} class="shadow-lg shadow-primary-500">
    <div class="flex items-center gap-6">
        <FolderOutline class="w-12 h-12 text-primary-500" />
        <div class="flex flex-col">
            <h2>{c.name}</h2>
            <p>{formatDate(c.date)}</p>
        </div>
    </div>
</Card>
