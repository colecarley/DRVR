<script lang="ts">
    import { page } from "$app/stores";
    import SlideView from "$lib/slide-view.svelte";

    const slide_id = $page.params.slide_id;
    const imagePath = `/slide-${slide_id}.jpg`;
</script>

<SlideView {imagePath} />
