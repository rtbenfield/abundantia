import type { ActionArgs } from "@remix-run/node";
import { logout } from "~/services/auth.server";

export async function action({ request }: ActionArgs) {
  await logout(request);
  return null;
}
