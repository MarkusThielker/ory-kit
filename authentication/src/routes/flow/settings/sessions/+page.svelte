<script lang="ts">
    import { frontendApi } from "$lib/ory";
    import { t } from "$lib/i18n";
    import { onMount } from "svelte";
    import type { Session } from "@ory/client";
    import identity from "$lib/stores/identity";

    let promise: Promise<Session[]> = frontendApi.listMySessions().then((it) => it.data);

    onMount(() => {
        if (!$identity) {
            window.location.replace("/flow/login")
        }
    });

</script>

<svelte:head>
    <title>{$t("page.settings.title")} - {$t("page.settings.sessions.title")}</title>
</svelte:head>

<div class="space-y-8">

    <div class="card grid grid-cols-2 text-center">

        <a href="/flow/settings" class="text-xl">{$t("page.settings.profile.title")}</a>

        <a href="/flow/settings/sessions" class="text-xl font-semibold">{$t("page.settings.sessions.title")}</a>

    </div>

    <div class="max-w-lg mx-auto">
        <button 
            class="btn-secondary" 
            on:click={() => frontendApi.disableMyOtherSessions().then(() => window.location.reload())}>
                {$t("page.settings.sessions.revoke_all")}
        </button>
    </div>

    <div class="space-y-4">

        {#await promise then sessions}
            {#each sessions as session}
                <div class="card space-y-4">
                    <div class="flex flex-row space-x-4 items-start">
                        <svg viewBox="0 0 100 100" class="mt-1 w-4 {session.active ? 'fill-cyan-200' : 'fill-neutral-900 dark:fill-white'}" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="50"/>
                        </svg>

                        {#if session.devices}
                            {#each session.devices as device}
                                <div class="w-full">
                                    <p>{device.ip_address}</p>
                                    {#if session.authenticated_at}
                                        <p>{$t("page.settings.sessions.sign_in", { date: new Date(session.authenticated_at).toLocaleString() })}</p>
                                    {/if}
                                </div>
                            {/each}
                        {/if}
                        <div class="flex items-end">
                            <button 
                                class="btn-primary max-w-fit max-h-fit" 
                                on:click={() => frontendApi.disableMySession({id: session.id}).then(() => window.location.reload())}>
                                {$t("page.settings.sessions.revoke")}
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        {/await}
    </div>
</div>
