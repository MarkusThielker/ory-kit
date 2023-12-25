<script lang="ts">
    import "$lib/styles/app.css";
    import { browser } from "$app/environment";

    let isDarkMode = false;
    function switchDarkMode() {
        isDarkMode = !isDarkMode;
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");

        if (browser) {
            if (isDarkMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }

    if (browser) {
        isDarkMode = localStorage.getItem("theme") === "dark";
    }
</script>

<slot />

<div class="fixed bottom-0 right-8 bg-neutral-700 pt-3 pb-2 px-8 rounded-t-md">
    <button
        class="{isDarkMode
            ? 'bg-cyan-200'
            : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
        on:click={() => switchDarkMode()}
        type="button"
    >
        <span class="sr-only">Enable dark mode</span>
        <span
            class="{isDarkMode
                ? 'translate-x-5'
                : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        >
            <span
                aria-hidden="true"
                class="{isDarkMode
                    ? 'opacity-0 duration-100 ease-out'
                    : 'opacity-100 duration-200 ease-in'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            >
                <svg
                    class="h-3 w-3 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                    />
                </svg>
            </span>
            <span
                aria-hidden="true"
                class="{isDarkMode
                    ? 'opacity-100 duration-200 ease-in'
                    : 'opacity-0 duration-100 ease-out'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            >
                <svg
                    class="h-3 w-3 text-cyan-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                </svg>
            </span>
        </span>
    </button>
</div>
