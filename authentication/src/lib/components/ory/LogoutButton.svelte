<script lang="ts">
    import { frontendApi } from "$lib/ory";
    import { t } from "$lib/i18n";
</script>

{#await frontendApi.createBrowserLogoutFlow() then flow}
    <a
        href={flow.data.logout_url}
        data-sveltekit-preload-data="tap"
        class="btn-secondary w-full"
    >
        {$t("page.logout.title")}
    </a>
{/await}
