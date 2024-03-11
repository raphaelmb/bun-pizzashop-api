import { Elysia, t } from "elysia";
import { registerRestaurant } from "./routes/register-restaurant";
import { sendAuthLink } from "./routes/send-auth-link";

const app = new Elysia()
    .use(registerRestaurant)
    .use(sendAuthLink)

app.listen(3333, () => console.log("HTTP Server listening on port 3333..."))