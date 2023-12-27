<script lang="ts">
    import { t } from "$lib/i18n";
    import LogoutButton from "$lib/components/ory/LogoutButton.svelte";
    import identity from "$lib/stores/identity";

    const identityJson = $identity ? JSON.stringify($identity, null, 2) : undefined;
</script>

<svelte:head>
    <title>{$t("page.common.app_name")}</title>
</svelte:head>

<div class="card">
    <h2 class="heading mb-2">{$t("page.common.app_name")}</h2>

    <div class="flex flex-col space-y-2">
        {#if !$identity?.id ?? true}
            <a href="/flow/login" class="btn-primary w-full">
                {$t("page.login.title")}
            </a>
            <a href="/flow/registration" class="btn-primary w-full">
                {$t("page.registration.title")}
            </a>
        {:else}
            <p>{$t("page.root.greeting", {name: $identity?.traits.name})}</p>

            <a href="/flow/settings" class="btn-primary w-full">
                {$t("page.settings.title")}
            </a>
            <LogoutButton />
        {/if}
    </div>
</div>

<div class="card mt-8">
    <h2 class="heading mb-2">Identity</h2>
    <pre class="bg-neutral-700 p-4 rounded-shape overflow-y-scroll">{ identityJson ? identityJson : "No identity found" }</pre>
</div>
