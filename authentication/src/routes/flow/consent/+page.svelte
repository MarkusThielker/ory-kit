<script lang="ts">
    import { t } from "$lib/i18n";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>{$t("page.login.title")}</title>
</svelte:head>

<div class="space-y-8">
    {JSON.stringify(data.oauth2ConsentRequest)}
</div>
