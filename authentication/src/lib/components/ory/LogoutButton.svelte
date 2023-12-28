<script lang="ts">
    import { frontendApi } from "$lib/ory";
    import { t } from "$lib/i18n";

    /** if the button should be a primary button (default: false) */
    export let primary = false;

</script>

<!--
@component

# LogoutButton
A button that logs the user out of the current session.
The button is a link to the logout url provided by the backend.
The button is a secondary button by default.

## Example
```svelte
<LogoutButton />
```
-->

{#await frontendApi.createBrowserLogoutFlow() then flow}
    <a
        href={flow.data.logout_url}
        data-sveltekit-preload-data="tap"
        class="w-full {primary ? 'btn-primary' : 'btn-secondary'}"
    >
        {$t("page.logout.title")}
    </a>
{/await}
