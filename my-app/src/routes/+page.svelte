<script>
    import { goto } from "$app/navigation";
    import Center from "$lib/center.svelte";
    import Header from "$lib/header.svelte";
    import Squeeze from "$lib/squeeze.svelte";
    import { Button, Card } from "flowbite-svelte";
</script>

<Center>
    <Header></Header>
    <Squeeze>
        <div class="flex gap-6 p-12 justify-center">
            <Card class="shadow-xl">
                <h1 class="text-2xl font-semibold">Welcome back!</h1>
                <Button
                    onclick={() => {
                        goto("/login");
                    }}>Log in</Button
                >
            </Card>

            <Card>
                <h1 class="text-2xl font-semibold">New here?</h1>
                <Button
                    onclick={() => {
                        goto("/signup");
                    }}>Sign up</Button
                >
            </Card>
        </div>
    </Squeeze>
</Center>
