import type { LoaderArgs } from "@remix-run/node";
import { login } from "~/services/auth.server";

export function loader({ request }: LoaderArgs) {
  return login(request);
}
