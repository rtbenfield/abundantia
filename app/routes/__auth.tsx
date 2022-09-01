import {
  AppShell,
  Burger,
  Button,
  Divider,
  Group,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { IconPlus } from "@tabler/icons";
import { requireAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

export async function loader({ request }: LoaderArgs) {
  const user = await requireAuth(request);
  const loans = await prisma.loan.findMany({
    where: { userId: user.id },
    orderBy: [{ name: "asc" }],
    select: {
      id: true,
      name: true,
    },
  });
  return json({
    loans,
  });
}

export default function AuthShell() {
  const { loans } = useLoaderData<typeof loader>();
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <AppShell
      fixed
      header={
        <Header height={64} p="md">
          <Group>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => toggle()}
                size="sm"
                color="gray"
              />
            </MediaQuery>
            <Text size="xl">Abundantia</Text>
          </Group>
        </Header>
      }
      navbar={
        <Navbar
          hidden={!opened}
          hiddenBreakpoint="sm"
          p="md"
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section
            component={ScrollArea}
            grow
            mt="xs"
            onClick={() => toggle()}
          >
            <NavLink component={Link} label="Home" to="/" />
            {loans.length > 0 && <Divider my="sm" />}
            {loans.map((loan) => (
              <NavLink
                component={Link}
                key={loan.id}
                label={loan.name}
                to={`/loans/${loan.id}`}
              />
            ))}
            <Divider my="sm" />
            <NavLink
              component={Link}
              icon={<IconPlus />}
              label="Add a Loan"
              to="/loans/new"
            />
          </Navbar.Section>
          <Navbar.Section>
            <LogoutButton />
          </Navbar.Section>
        </Navbar>
      }
      navbarOffsetBreakpoint="sm"
      padding="md"
    >
      <Outlet />
    </AppShell>
  );
}

function LogoutButton() {
  return (
    <Form action="/logout" method="post">
      <Button fullWidth variant="filled" type="submit">
        Logout
      </Button>
    </Form>
  );
}
