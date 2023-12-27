import { writable } from "svelte/store";

export type ToastMessage = {
    message: string
    type: "success" | "info" | "error"
}

const store = () => {

    let {subscribe, set, update} = writable<ToastMessage[]>([]);

    const push = (message: ToastMessage) => {
        update((messages) => [...messages, message])
    }

    return {
        subscribe,
        showSuccess: (message: string) => {

            const toast = {
                message,
                type: "success"
            } as ToastMessage

            push(toast)
        },
        showInfo: (message: string) => {

            const toast = {
                message,
                type: "info"
            } as ToastMessage

            push(toast)
        },
        showError: (message: string) => {

            const toast = {
                message,
                type: "error"
            } as ToastMessage

            push(toast)
        },
        clearAllMessages: () => {
            set([])
        }
    }
}

export default store();
