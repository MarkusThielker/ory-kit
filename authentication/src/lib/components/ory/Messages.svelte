<script lang="ts">
    import { t } from "$lib/i18n";
    import { type Message, type UiText, UiTextTypeEnum } from "@ory/client";

    /** the list of messages to show */
    export let messages: UiText[] | Message[] | undefined;

    let messagesTyped: UiText[] = messages?.map((it) => it as UiText) ?? [];

    function getAlertType(uiText: UiText) {
        switch (uiText.type) {
            case UiTextTypeEnum.Error:
                return "alert-error";
            case UiTextTypeEnum.Success:
                return "alert-success";
            case UiTextTypeEnum.Info:
                return "alert-info";
        }
    }
</script>

<!--
@component

# Messages
This component displays a list of messages.
Can be used to display messages in one place instead of each flow component displaying its own messages.

## Example
```svelte
{#if flow.ui.messages}
    <Messages messages={flow.ui.messages}/>
{/if}
```
-->

<div class="mb-2">
    {#if messages}
        {#each messagesTyped as message}
            <div
                class="w-full inline-flex items-center space-x-1 {getAlertType(
                    message
                )}"
            >
                <p>{$t(`page.ory.${message.id}`, message.context)}</p>
            </div>
        {/each}
    {/if}
</div>
