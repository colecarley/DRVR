<!-- 
    This file is the home page of the Dr. VR platform.
    It is a simple landing page with a welcome message and two sections for new users and returning users.
  -->
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
        <div class="p-12">
            <h1 class="text-primary-200 text-8xl text-center mb-12">
                WELCOME TO DR. VR
            </h1>

            <div class="grid grid-cols-2 gap-12">
                <div class="w-full h-full flex items-end justify-end">
                    <div class="w-3/4 h-fit">
                        <p class="text-primary-200 text-xl">
                            Dr. VR is a platform for medical professionals to
                            view, annotate, and share microscopic images.
                        </p>
                        <Card class="mt-12 max-w-full">
                            <div class="mb-6">
                                <div>
                                    <h1 class="text-2xl font-semibold">
                                        New here?
                                    </h1>
                                </div>
                                <p>Sign up to create an account.</p>
                            </div>
                            <Button
                                onclick={() => {
                                    goto("/signup");
                                }}>Sign up</Button
                            >
                        </Card>
                    </div>
                </div>
                <img
                    src="/slide-1.jpg"
                    alt="Dr. VR"
                    class="rounded-lg shadow-xl w-full"
                />
                <img
                    src="/slide-4.jpg"
                    alt="Dr. VR"
                    class="rounded-lg shadow-xl w-full"
                />
                <div class="w-full h-full">
                    <div class="w-3/4 h-3/4">
                        <p class="text-primary-200 text-xl">
                            DR. VR reimagines the way medical professionals
                            interact with microscopic images. Our platform
                            provides a seamless experience for viewing,
                            annotating, and sharing images with colleagues.
                        </p>
                        <Card class="shadow-xl my-12 max-w-full">
                            <div class="mb-6">
                                <h1 class="text-2xl font-semibold">
                                    Welcome back!
                                </h1>
                                <p>Log in to your account to continue.</p>
                            </div>
                            <Button
                                onclick={() => {
                                    goto("/login");
                                }}>Log in</Button
                            >
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </Squeeze>
</Center>
