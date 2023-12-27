import type { AxiosError } from "axios";
import toasts from "$lib/stores/toasts";

const resetFlow = () => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.delete("flow")
    window.location.search = searchParams.toString()
}

export function handleFlowGetError(
    flowType: "login" | "registration" | "settings" | "recovery" | "verification",
) {
    return async (err: AxiosError) => {

        console.error(err)

        switch (err.response?.data.error?.id) {
            case "session_inactive":
                window.location.replace("/flow/login?return_to=" + window.location.href)
                return
            case "session_aal2_required":
                if (err.response?.data.redirect_browser_to) {
                    const redirectTo = new URL(err.response?.data.redirect_browser_to)
                    if (flowType === "settings") {
                        redirectTo.searchParams.set("return_to", window.location.href)
                    }
                    // 2FA is enabled and enforced, but user did not perform 2fa yet!
                    window.location.replace(redirectTo.toString())
                    return
                }
                window.location.replace("/flow/login?aal=aal2&return_to=" + window.location.href)
                return
            case "session_already_available":
                // User is already signed in, let's redirect them home!
                window.location.replace("/flow/")
                return
            case "session_refresh_required":
                // We need to re-authenticate to perform this action
                window.location.replace(err.response?.data.redirect_browser_to)
                return
            case "self_service_flow_return_to_forbidden":
                // The flow expired, let's request a new one.
                toasts.showError("The return_to address is not allowed.")
                resetFlow()
                window.location.replace("/flow/" + flowType)
                return
            case "self_service_flow_expired":
                // The flow expired, let's request a new one.
                toasts.showError("Your interaction expired, please fill out the form again.")
                resetFlow()
                window.location.replace("/flow/" + flowType)
                return
            case "security_csrf_violation":
                // A CSRF violation occurred. Best to just refresh the flow!
                toasts.showError("A security violation was detected, please fill out the form again.")
                resetFlow()
                window.location.replace("/flow/" + flowType)
                return
            case "security_identity_mismatch":
                // The requested item was intended for someone else. Let's request a new flow...
                resetFlow()
                window.location.replace("/flow/" + flowType)
                return
            case "browser_location_change_required":
                // Ory Kratos asked us to point the user to this URL.
                window.location.replace(err.response.data.redirect_browser_to)
                return
        }

        switch (err.response?.status) {
            case 410:
                // The flow expired, let's request a new one.
                resetFlow()
                window.location.replace("/flow/" + flowType)
                return
        }

        // We are not able to handle the error? Return it.
        return Promise.reject(err)
    }
}

export const handleFlowError = handleFlowGetError
