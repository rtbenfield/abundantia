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
import { Form, Link, useLoaderData, useTransition } from "@remix-run/react";
import { IconCurrencyDollar, IconPercentage } from "@tabler/icons";
import { getFormData } from "remix-params-helper";
import { z } from "zod";
import { requireAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

const paramSchema = z.object({ loan: z.string() });
const form = z.strictObject({
  annualInterestRate: z.number().min(0),
  loanAmount: z.number().min(0),
  name: z.string().min(1),
  startMonth: z.number().min(0).max(11),
  startYear: z.number().int().min(1900),
  years: z.number().int().min(1),
});

export async function action({ params, request }: ActionArgs) {
  const { id: userId } = await requireAuth(request);
  const { loan: id } = paramSchema.parse(params);
  console.debug(`starting loan update ${id} for user ${userId}`, {
    id,
    userId,
  });
  const loan = await prisma.loan.findUnique({
    where: { id },
    select: { userId: true },
  });
  if (!loan || loan.userId !== userId) {
    throw new Response(null, { status: 404 });
  }
  const { data, errors, success } = await getFormData(request, form);
  if (!success) {
    console.info(`loan input errors by user ${userId}`, {
      errors,
      userId,
    });
    return json({ errors }, { status: 400 });
  }
  await prisma.loan.update({
    where: { id },
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
  console.info(`loan ${id} updated by user ${userId}`, {
    loan,
    userId,
  });
  return redirect(`/loans/${id}`);
}

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
  return json({
    loan: {
      annualInterestRate: (
        100 *
        loan.periodInterestRate.toNumber() *
        12
      ).toFixed(3),
      id: loan.id,
      loanAmount: loan.loanAmount * 100,
      name: loan.name,
      startMonth: loan.startDate.getMonth(),
      startYear: loan.startDate.getFullYear(),
      years: loan.periods / 12,
    },
  });
}

export default function LoanEdit() {
  const { state } = useTransition();
  const { loan } = useLoaderData<typeof loader>();
  return (
    <Container size="xs">
      <Form method="post">
        <Stack>
          <Title order={1}>Edit Loan</Title>
          <TextInput
            defaultValue={loan.name}
            label="Name"
            name="name"
            required
          />
          <TextInput
            defaultValue={loan.loanAmount}
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
              defaultValue={loan.years}
              label="Years"
              min={1}
              name="years"
              required
              step="1"
              type="number"
            />
            <TextInput
              defaultValue={loan.annualInterestRate}
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
              defaultValue={loan.startYear}
              label="Starting Year"
              min={1900}
              name="startYear"
              required
              step="1"
              type="number"
            />
            <NativeSelect
              defaultValue={loan.startMonth}
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
              Save Loan
            </Button>
            <Button
              component={Link}
              size="md"
              to={`/loans/${loan.id}`}
              variant="subtle"
            >
              Cancel
            </Button>
          </Group>
        </Stack>
      </Form>
    </Container>
  );
}
