<script lang="ts">
    import { get } from "svelte/store";
    import identityStore from "$lib/stores/identity";
    import { t } from "$lib/i18n";
    import type { Identity } from "@ory/client";
    import { frontendApi } from "$lib/ory";
    import LogoutButton from "$lib/components/ory/LogoutButton.svelte";

    const identity: Identity | null = get(identityStore);
</script>

<svelte:head>
    <title>{$t("page.common.app_name")}</title>
</svelte:head>

<div class="card">
    <h2 class="heading mb-2">{$t("page.common.app_name")}</h2>

    <div class="flex flex-col space-y-2">
        {#if !identity?.id ?? true}
            <a href="/flow/login" class="btn-primary w-full">
                {$t("page.login.title")}
            </a>
            <a href="/flow/registration" class="btn-primary w-full">
                {$t("page.registration.title")}
            </a>
        {:else}
            <p>{$t("page.root.greeting", { name: identity.traits.name })}</p>

            <a href="/flow/settings" class="btn-primary w-full">
                {$t("page.settings.title")}
            </a>
            <LogoutButton />
        {/if}
    </div>
</div>
