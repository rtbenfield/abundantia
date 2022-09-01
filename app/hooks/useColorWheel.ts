import type { MantineTheme } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";

export function useColorWheel() {
  const theme = useMantineTheme();
  return makeColorGenerator(theme);
}

function* makeColorGenerator({
  colors,
  colorScheme,
}: MantineTheme): Generator<string, never, void> {
  const index = colorScheme === "dark" ? 9 : 9;
  while (true) {
    yield colors.blue[index];
    yield colors.cyan[index];
    yield colors.grape[index];
    yield colors.green[index];
    yield colors.indigo[index];
    yield colors.lime[index];
    yield colors.orange[index];
    yield colors.pink[index];
    yield colors.red[index];
    yield colors.teal[index];
    yield colors.violet[index];
    yield colors.yellow[index];
  }
}
