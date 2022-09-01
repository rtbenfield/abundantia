import {
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { IconCompass, IconPencil, IconTrash } from "@tabler/icons";
import { z } from "zod";
import { requireAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

const paramSchema = z.object({ loan: z.string() });

export async function loader({ params, request }: LoaderArgs) {
  const { id: userId } = await requireAuth(request);
  const { loan: id } = paramSchema.parse(params);
  console.debug(`retrieving loan ${id} for user ${userId}`, {
    loanId: id,
    userId,
  });
  const loan = await prisma.loan.findUnique({
    where: { id },
    select: {
      id: true,
      loanAmount: true,
      name: true,
      periods: true,
      periodInterestRate: true,
      startDate: true,
      userId: true,
    },
  });
  if (!loan || loan.userId !== userId) {
    throw new Response(null, { status: 404 });
  }
  return json({ loan });
}

export default function LoanDetailsShell() {
  const { loan } = useLoaderData<typeof loader>();
  return (
    <Container size="lg">
      <Stack>
        <Group position="apart">
          <Title order={1}>{loan.name}</Title>
          <Group sx={{ flexDirection: "row-reverse" }}>
            <Button
              component={Link}
              leftIcon={<IconCompass />}
              to="explore"
              variant="subtle"
            >
              Explore
            </Button>
            <Button component={Link} leftIcon={<IconPencil />} to="edit">
              Edit
            </Button>
            <Button
              color="red"
              component={Link}
              leftIcon={<IconTrash />}
              to="delete"
              variant="outline"
            >
              Delete
            </Button>
          </Group>
        </Group>
        <SimpleGrid breakpoints={[{ cols: 2, minWidth: "md" }]}>
          <Paper p="md" withBorder>
            <Text color="dimmed" size="sm">
              Loan amount
            </Text>
            <Text size="xl">{usd.format(loan.loanAmount * 100)}</Text>
          </Paper>
          <Paper p="md" withBorder>
            <Text color="dimmed" size="sm">
              APR (Annual Percentage Rate)
            </Text>
            <Text size="xl">
              {percent.format(Number(loan.periodInterestRate) * 12)}
            </Text>
          </Paper>
          <Paper p="md" withBorder>
            <Text color="dimmed" size="sm">
              Start date
            </Text>
            <Text size="xl">{month.format(new Date(loan.startDate))}</Text>
          </Paper>
          <Paper p="md" withBorder>
            <Text color="dimmed" size="sm">
              Duration
            </Text>
            <Text size="xl">{`${years.format(loan.periods / 12)}`}</Text>
          </Paper>
        </SimpleGrid>
        <Outlet />
      </Stack>
    </Container>
  );
}

const usd = new Intl.NumberFormat("en-US", {
  currency: "usd",
  style: "currency",
});

const month = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
});

const percent = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 3,
  style: "percent",
});

const years = new Intl.NumberFormat("en-US", {
  unit: "year",
  unitDisplay: "long",
  style: "unit",
});
