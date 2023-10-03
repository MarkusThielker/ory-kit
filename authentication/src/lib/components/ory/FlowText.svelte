<script lang="ts">
    import { t, fromNode } from "$lib/i18n";
    import type { UiNode, UiNodeTextAttributes } from "@ory/client";

    export let node: UiNode;
    const attributes = node.attributes as UiNodeTextAttributes;
</script>

{$t(fromNode(node), node.meta?.label?.context)}
{#if attributes.text.id === 1050015} <!-- lookup_secret_codes -->

    <div class="grid grid-cols-3 gap-2">
        {#each attributes.text.context?.secrets as code}
            <code class="bg-neutral-200 dark:bg-neutral-700 rounded-md px-2 py-1 text-center">{ code.id === 1050014 ? $t("page.settings.lookup_secret.used") : code.context.secret}</code>
        {/each}
    </div>

{:else if attributes.text.id === 1050006} <!-- totp_secret_key -->

    <code class="bg-neutral-200 dark:bg-neutral-700 rounded-md px-2 py-1 text-center">{attributes.text.text}</code>

{:else}

    {$t(`ory.${attributes.text.id}`, attributes.text.context)}

{/if}
