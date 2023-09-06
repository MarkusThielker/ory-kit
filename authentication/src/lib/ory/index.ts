import {
    Configuration,
    FrontendApi,
} from "@ory/client";

export const frontendApi = new FrontendApi(new Configuration(
    {
        basePath: "http://localhost:4433",
        baseOptions: {
            withCredentials: true,
        },
    }
))
