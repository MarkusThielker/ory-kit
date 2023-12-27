<script lang="ts">
    import { get } from "svelte/store";
    import identityStore from "$lib/stores/identity";
    import { t } from "$lib/i18n";
    import type { PageData } from "./$types";

    export let data: PageData;

    const identity = get(identityStore);
</script>

<svelte:head>
    <title>{$t("page.consent.title")}</title>
</svelte:head>

<div class="space-y-8">
    <div class="card space-y-2">

        <p>{$t("page.consent.description", { name: identity?.traits?.name ?? identity?.traits?.username, client: data.oauth2ConsentRequest?.client?.client_name ?? "" })}</p>

        <ul>
            {#each data.oauth2ConsentRequest?.requested_scope ?? [] as scope}
                <li> - {scope}</li>
            {/each}
        </ul>

        <div class="grid grid-cols-2 gap-4">
            <form action="?/reject" method="post">
                <input type="hidden" name="consentChallenge" value="{data.oauth2ConsentRequest?.challenge}" />
                <button type="submit" class="btn-secondary w-full">
                    {$t("page.consent.reject")}
                </button>
            </form>
            <form action="?/accept" method="post">
                <input type="hidden" name="consentChallenge" value="{data.oauth2ConsentRequest?.challenge}" />
                <button type="submit" class="btn-primary w-full">
                    {$t("page.consent.accept")}
                </button>
            </form>
        </div>
    </div>
</div>
