<script lang="ts">
    import { frontendApi } from "$lib/ory";
    import { t } from "$lib/i18n";

    export let primary = false;

</script>

{#await frontendApi.createBrowserLogoutFlow() then flow}
    <a
        href={flow.data.logout_url}
        data-sveltekit-preload-data="tap"
        class="w-full {primary ? 'btn-primary' : 'btn-secondary'}"
    >
        {$t("page.logout.title")}
    </a>
{/await}
