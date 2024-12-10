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
        <div class="flex flex-col h-full justify-center items-center">
            <Card class="shadow-lg shadow-primary-500">
                <h1 class="mb-6">Sign up</h1>
                <div class="flex flex-col gap-6">
                    <div>
                        <Label for="email">Email</Label>
                        <Input id="email" />
                    </div>
                    <div>
                        <Label for="username">Username</Label>
                        <Input id="username" />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <Label for="firstname">First Name</Label>
                            <Input id="firstname" />
                        </div>
                        <div>
                            <Label for="lastname">Last Name</Label>
                            <Input id="lastname" />
                        </div>
                    </div>
                    <div>
                        <Label for="password">Password</Label>
                        <Input type="password" id="password" />
                    </div>
                    <div>
                        <Label for="repeat-password">Repeat Password</Label>
                        <Input type="password" id="repeat-password" />
                    </div>
                    <Button onclick={() => goto("/cases")}
                        >Create Account</Button
                    >
                </div>
            </Card>
        </div>
    </Squeeze>
</Center>
