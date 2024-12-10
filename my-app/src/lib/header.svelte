<script>
    import { page } from "$app/stores";
    import {
        Navbar,
        NavBrand,
        NavHamburger,
        NavLi,
        NavUl,
    } from "flowbite-svelte";
    import { onDestroy } from "svelte";

    let showLinks = $state(false);
    const sub = page.subscribe((value) => {
        showLinks =
            value.route.id !== "/" &&
            value.route.id !== "/signup" &&
            value.route.id !== "/login";
    });

    $effect(() => {
        console.log("isHome", showLinks);
    });

    onDestroy(sub);
</script>

<Navbar>
    <NavBrand href="/">
        <span
            class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
            >DR VR</span
        >
    </NavBrand>
    <NavHamburger />
    {#if showLinks}
        <NavUl>
            <NavLi href="/">Home</NavLi>
            <NavLi href="/cases">Cases</NavLi>
            <NavLi href="/">Logout</NavLi>
        </NavUl>
    {/if}
</Navbar>
