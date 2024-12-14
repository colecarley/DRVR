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

    let inside = $state(false);
    const sub = page.subscribe((value) => {
        inside =
            value.route.id !== "/" &&
            value.route.id !== "/signup" &&
            value.route.id !== "/login";
    });

    onDestroy(sub);
</script>

<Navbar>
    <NavBrand href="/">
        <span
            class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
            >DR. VR</span
        >
    </NavBrand>
    <NavHamburger />

    <NavUl>
        {#if inside}
            <NavLi href="/">Home</NavLi>
            <NavLi href="/cases">Cases</NavLi>
            <NavLi href="/">Logout</NavLi>
        {:else}
            <NavLi href="/login">Login</NavLi>
            <NavLi href="/signup">Sign up</NavLi>
        {/if}
    </NavUl>
</Navbar>
