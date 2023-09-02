<script lang="ts">
    import ory from "$lib/ory";
    import { t } from "$lib/i18n";
    import { page } from "$app/stores";
    import { get } from "svelte/store";
    import { onMount } from "svelte";

    type Error = {
        code: number;
        id: string;
        message: string;
        reason: string;
        status: string;
    };

    let errorId: string | null = get(page).url.searchParams.get("id");

    let promise = ory
        .getFlowError({ id: errorId ?? "" })
        .then((it) => it.data.error as Error);

    onMount(() => {
        if (errorId == null) {
            window.location.replace("/");
        }
    });
</script>

<svelte:head>
    <title>{$t("page.login.title")}</title>
</svelte:head>

{#await promise then error}
    <div class="text-6xl">{error.code}</div>
    <div class="text-3xl">{error.status}</div>
    <div>{error.message}</div>
    <div>{error.reason}</div>
{/await}
