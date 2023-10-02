<script lang="ts">
    import { t } from "$lib/i18n";
    import { UiTextTypeEnum, type Message, type UiText } from "@ory/client";

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
