import {
    Configuration,
    FrontendApi,
} from "@ory/client";
import { PUBLIC_KRATOS_PUBLIC_API } from "$env/static/public";

export const frontendApi = new FrontendApi(new Configuration(
    {
        basePath: PUBLIC_KRATOS_PUBLIC_API,
        baseOptions: {
            withCredentials: true,
        },
    }
))
