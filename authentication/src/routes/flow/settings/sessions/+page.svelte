<script lang="ts">
    import { frontendApi } from "$lib/ory";
    import { t } from "$lib/i18n";
    import { onMount } from "svelte";
    import type { Session } from "@ory/client";
    import identity from "$lib/stores/identity";

    let promise: Promise<Session[]> = frontendApi.listMySessions().then((it) => it.data);

    onMount(() => {
        if (!$identity) {
            window.location.replace("/flow/login")
        }
    });

    function parseUserAgent(session: Session|undefined): { browser: string; os: string } {

        let browser = t.get("page.settings.sessions.unknown_browser");
        let os = t.get("page.settings.sessions.unknown_os");

        if (session !== undefined && session.devices && session.devices.length > 0) {

            let ua = session.devices[0].user_agent as string; 

            if (ua.includes("Edge")) {
                browser = "Edge";
            } else if (ua.includes("Chrome") && !ua.includes("Chromium")) {
                browser = "Chrome";
            } else if (ua.includes("Safari") && !ua.includes("Chrome") && !ua.includes("Chromium")) {
                browser = "Safari";
            } else if (ua.includes("Firefox") && !ua.includes("Seamonkey") && !ua.includes("Chrome") && !ua.includes("Safari")) {
                browser = "Firefox";
            } else if (ua.includes("MSIE") || ua.includes("Trident")) {
                browser = "Internet Explorer";
            }

            if (ua.includes("Windows NT")) {
                os = "Windows"
            } else if (ua.includes("Mac OS X")) {
                os = "Mac OS X"
            } else if (ua.includes("Linux")) {
                os = "Linux"
            } else if (ua.includes("Android")) {
                os = "Android"
            } else if (ua.includes("iPhone") || ua.includes("iPad")) {
                os = "iOS"
            }    
        }    

        return { browser, os }
    }
</script>

<svelte:head>
    <title>{$t("page.settings.title")} - {$t("page.settings.sessions.title")}</title>
</svelte:head>

<div class="space-y-8">

    <div class="card grid grid-cols-2 text-center">

        <a href="/flow/settings" class="text-xl">{$t("page.settings.profile.title")}</a>

        <a href="/flow/settings/sessions" class="text-xl font-semibold">{$t("page.settings.sessions.title")}</a>

    </div>

    {#await promise then sessions}

        <div class="max-w-lg mx-auto">
            <button 
                class="btn-secondary"
                disabled={sessions.length == 0}
                on:click={() => frontendApi.disableMyOtherSessions().then(() => window.location.reload())}>
                    {$t("page.settings.sessions.revoke_all")}
            </button>
        </div>

        <div class="space-y-4">
            {#each sessions as session}
                <div class="card space-y-4">
                    <div class="flex flex-row space-x-4 items-start">
                        <svg viewBox="0 0 100 100" class="mt-1 w-4 {session.active ? 'fill-cyan-200' : 'fill-neutral-900 dark:fill-white'}" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="50"/>
                        </svg>

                        {#if session.devices}
                            {#each session.devices as device}
                                <div class="w-full">
                                    <p>{device.ip_address}</p>
                                    <p>{$t("page.settings.sessions.device_info", parseUserAgent(session))}</p>
                                    {#if session.authenticated_at}
                                        <p>{$t("page.settings.sessions.sign_in", { date: new Date(session.authenticated_at).toLocaleString() })}</p>
                                    {/if}
                                </div>
                            {/each}
                        {/if}
                        <div class="flex items-end">
                            <button 
                                class="btn-primary max-w-fit max-h-fit" 
                                on:click={() => frontendApi.disableMySession({id: session.id}).then(() => window.location.reload())}>
                                {$t("page.settings.sessions.revoke")}
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/await}
</div>
