<!-- 
    This is the login page. It is a simple form with a username and password input field.
    The login button is a simple button that redirects to the cases page.
  -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import Center from "$lib/center.svelte";
    import Header from "$lib/header.svelte";
    import Squeeze from "$lib/squeeze.svelte";
    import { Button, Card, Input, Label } from "flowbite-svelte";
</script>

<Center>
    <Header></Header>
    <Squeeze>
        <div class="flex flex-col h-full items-center mt-24">
            <Card class="shadow-lg shadow-primary-500">
                <h1 class="mb-6">Login</h1>
                <div class="flex flex-col gap-6">
                    <div>
                        <Label for="username">Username</Label>
                        <Input id="username" />
                    </div>
                    <div>
                        <Label for="Password">Password</Label>
                        <Input type="password" id="password" />
                    </div>
                    <Button onclick={() => goto("/cases")}>Login</Button>
                </div>
            </Card>
        </div>
    </Squeeze>
</Center>
