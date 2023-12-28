<script lang="ts">
    import { fromNode, t } from "$lib/i18n";
    import Messages from "$lib/components/ory/Messages.svelte";
    import type { UiNode, UiNodeInputAttributes } from "@ory/client";

    export let node: UiNode;
    const attributes = node.attributes as UiNodeInputAttributes;
</script>

<fieldset>
    <label>
        <span>{$t(fromNode(node), node.meta.label?.context)}</span>
        <input
            class="text-input"
            disabled={attributes.disabled}
            name={attributes.name}
            placeholder={$t(fromNode(node), node.meta.label?.context)}
            required={attributes.required}
            type="datetime-local"
            value={attributes.value ?? ""}
        />
    </label>
</fieldset>

<Messages messages={node.messages} />
