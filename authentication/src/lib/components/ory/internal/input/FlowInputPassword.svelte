<script lang="ts">
    import { fromNode, t } from "$lib/i18n";
    import Messages from "$lib/components/ory/Messages.svelte";
    import PasswordToggle from "$lib/components/ory/internal/input/FlowInputPasswordToggle.svelte";
    import type { UiNode, UiNodeInputAttributes } from "@ory/client";

    export let node: UiNode;
    const attributes = node.attributes as UiNodeInputAttributes;

    let isHidden = true;
</script>

<fieldset>
    <label class="flex flex-col">
        <span>{$t(fromNode(node), node.meta.label?.context)}</span>
        <span class="inline-flex items-center">
            <input
                class="text-input"
                disabled={attributes.disabled}
                name={attributes.name}
                placeholder={$t(fromNode(node), node.meta.label?.context)}
                required={attributes.required}
                type={isHidden ? "password" : "text"}
                value={attributes.value ?? ""}
            />
            <PasswordToggle bind:isHidden classNames="-ml-8" />
        </span>
    </label>
</fieldset>

<Messages messages={node.messages} />
