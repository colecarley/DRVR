<!-- 
    This is a simple card component that displays a case name and date.
    It uses the Card component from Flowbite and the FolderOutline icon from Flowbite Icons.
-->
<script lang="ts">
    import { Card } from "flowbite-svelte";
    import { FolderOutline } from "flowbite-svelte-icons";
    import { formatDate } from "../helpers/format-date";
    import type { Case } from "../types/case";
    let {
        c,
    }: {
        c: Case;
    } = $props();
</script>

<Card href={c.href} class="shadow-lg shadow-primary-500 max-w-full">
    <div class="flex items-center gap-6">
        <FolderOutline class="w-12 h-12 text-primary-500" />
        <div class="flex flex-col">
            <h2>{c.name}</h2>
            <p>{formatDate(c.date)}</p>
        </div>
    </div>
</Card>
