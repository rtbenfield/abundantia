import {
  Button,
  Container,
  Group,
  NativeSelect,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import { IconCurrencyDollar, IconPercentage } from "@tabler/icons";
import { getFormData } from "remix-params-helper";
import { z } from "zod";
import { requireAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

const form = z.strictObject({
  annualInterestRate: z.number().min(0),
  loanAmount: z.number().min(0),
  name: z.string().min(1),
  startMonth: z.number().min(0).max(11),
  startYear: z.number().int().min(1900),
  years: z.number().int().min(1),
});

export async function action({ request }: ActionArgs) {
  const { id: userId } = await requireAuth(request);
  console.debug(`starting loan create for user ${userId}`, { userId });
  const { data, errors, success } = await getFormData(request, form);
  if (!success) {
    console.info(`loan input errors by user ${userId}`, {
      errors,
      userId,
    });
    return json({ errors }, { status: 400 });
  }
  const loan = await prisma.loan.create({
    data: {
      loanAmount: data.loanAmount / 100,
      name: data.name,
      periodInterestRate: data.annualInterestRate / 12 / 100,
      periods: data.years * 12,
      periodType: "Monthly",
      startDate: new Date(data.startYear, data.startMonth, 1, 0, 0, 0, 0),
      userId,
    },
    select: { id: true },
  });
  console.info(`loan ${loan.id} created by user ${userId}`, {
    loan,
    userId,
  });
  return redirect(`/loans/${loan.id}`);
}

export async function loader({ request }: LoaderArgs) {
  await requireAuth(request);
  return null;
}

export default function LoansNew() {
  const { state } = useTransition();
  return (
    <Container size="xs">
      <Form method="post">
        <Stack>
          <Title order={1}>Add a Loan</Title>
          <TextInput label="Name" name="name" required />
          <TextInput
            icon={<IconCurrencyDollar />}
            label="Loan Amount"
            min={0}
            name="loanAmount"
            required
            step="0.01"
            type="number"
          />
          <Group grow>
            <TextInput
              label="Years"
              min={1}
              name="years"
              required
              step="1"
              type="number"
            />
            <TextInput
              label="Annual Interest Rate"
              min={0}
              name="annualInterestRate"
              required
              rightSection={<IconPercentage />}
              step="any"
              type="number"
            />
          </Group>
          <Group grow>
            <TextInput
              label="Starting Year"
              min={1900}
              name="startYear"
              required
              step="1"
              type="number"
            />
            <NativeSelect
              data={[
                { value: "" },
                { label: "Jan", value: "0" },
                { label: "Feb", value: "1" },
                { label: "Mar", value: "2" },
                { label: "Apr", value: "3" },
                { label: "May", value: "4" },
                { label: "Jun", value: "5" },
                { label: "Jul", value: "6" },
                { label: "Aug", value: "7" },
                { label: "Sep", value: "8" },
                { label: "Oct", value: "9" },
                { label: "Nov", value: "10" },
                { label: "Dec", value: "11" },
              ]}
              label="Starting Month"
              name="startMonth"
              required
            />
          </Group>
          <Group position="apart" sx={{ flexDirection: "row-reverse" }}>
            <Button
              disabled={state !== "idle"}
              size="md"
              type="submit"
              variant="filled"
            >
              Add Loan
            </Button>
          </Group>
        </Stack>
      </Form>
    </Container>
  );
}
