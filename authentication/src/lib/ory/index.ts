import {
    Configuration,
    FrontendApi,
} from "@ory/client";
import { env } from "$env/dynamic/public";

export const frontendApi = new FrontendApi(new Configuration(
    {
        basePath: env.PUBLIC_KRATOS_PUBLIC_API,
        baseOptions: {
            withCredentials: true,
        },
    }
))
