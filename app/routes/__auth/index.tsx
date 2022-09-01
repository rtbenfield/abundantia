import {
  Alert,
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
import { Link, useLoaderData } from "@remix-run/react";
import { IconAlertCircle, IconPlus } from "@tabler/icons";
import { requireAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

export async function loader({ request }: LoaderArgs) {
  const user = await requireAuth(request);
  const loans = await prisma.loan.findMany({
    where: { userId: user.id },
    orderBy: [{ name: "asc" }],
    select: {
      id: true,
      loanAmount: true,
      name: true,
      periodInterestRate: true,
      startDate: true,
    },
  });
  return json({
    loans,
  });
}

export default function Home() {
  const { loans } = useLoaderData<typeof loader>();
  return (
    <Container>
      {loans.length === 0 && (
        <Alert
          color="primary"
          icon={<IconAlertCircle />}
          title="Add your first loan"
        >
          <Stack>
            Add your first loan to explore ways to pay it down.
            <Button component={Link} leftIcon={<IconPlus />} to="/loans/new">
              Add a Loan
            </Button>
          </Stack>
        </Alert>
      )}
      <SimpleGrid breakpoints={[{ cols: 2, minWidth: "md" }]}>
        {loans.map((loan) => (
          <Paper key={loan.id} p="md" withBorder>
            <Title order={3}>{loan.name}</Title>
            <Text size="lg">{`${usd.format(
              loan.loanAmount * 100
            )} at ${percent.format(
              Number(loan.periodInterestRate) * 12
            )} APR`}</Text>
            <Text color="dimmed">{`Started ${month.format(
              new Date(loan.startDate)
            )}`}</Text>
            <Group sx={{ flexDirection: "row-reverse" }}>
              <Button component={Link} size="xs" to={`/loans/${loan.id}`}>
                View
              </Button>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
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
