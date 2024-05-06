import { Elysia, t } from "elysia";
import { registerRestaurant } from "./routes/register-restaurant";
import { sendAuthLink } from "./routes/send-auth-link";
import { authenticateFromLink } from "./routes/authenticate-from-link";
import { signOut } from "./routes/sign-out";
import { getProfile } from "./routes/get-profile";
import { getManagedRestaurant } from "./routes/get-managed-restaurant";
import { getEffectiveTypeParameterDeclarations } from "typescript";
import { getOrderDetails } from "./routes/get-order-details";

const app = new Elysia()
    .use(registerRestaurant)
    .use(sendAuthLink)
    .use(authenticateFromLink)
    .use(signOut)
    .use(getProfile)
    .use(getManagedRestaurant)
    .use(getOrderDetails)
    .onError(({ code, error, set }) => {
        switch (code) {
            case "VALIDATION": {
                set.status = error.status
                return error.toResponse()
            }
            default: {
                set.status = 500
                console.error(error)
                return new Response(null, { status: 500 })
            }
        }
    })

app.listen(3333, () => console.log("HTTP Server listening on port 3333..."))