<!-- 
    This is the header component that will be used in all the pages.
    It will show the brand name and the navigation links based on the current page.
    If the user is logged in, it will show the Home, Cases, and Logout links.
    If the user is not logged in, it will show the Login and Sign up links.
  -->
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

    // check if the user is inside the app
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
