import {
  Button,
  Container,
  createEmotionCache,
  Group,
  MantineProvider,
  Text,
  Title,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { StylesPlaceholder } from "@mantine/remix";
import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import type { PropsWithChildren } from "react";
import { RemixNavigationProgress } from "./components/nprogress";

// without this there are weird Mantine style issues
// this cache is exported to be used in entry.server.tsx to sync styles for SSR
// https://github.com/mantinedev/mantine/issues/1895
export const emotionCache = createEmotionCache({ key: "mantine" });

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Abundantia",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <Document>
      <Container py="xl">
        <Text
          align="center"
          sx={{
            opacity: "10%",
            fontSize: "20rem",
          }}
        >
          {caught.status}
        </Text>
        <Title align="center" order={1}>
          Nothing to see here
        </Title>
        <Text align="center" color="dimmed" size="lg">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </Text>
        <Group py="lg" position="center">
          <Button component={Link} size="md" to="/">
            Take me back home
          </Button>
        </Group>
      </Container>
    </Document>
  );
}

function Document({ children }: PropsWithChildren<{}>) {
  const preferredColorScheme = useColorScheme();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <StylesPlaceholder />
      </head>
      <body>
        <MantineProvider
          emotionCache={emotionCache}
          theme={{
            colors: {
              rebeccapurple: [
                "#e0d6eb",
                "#d1c2e0",
                "#c2add6",
                "#b399cc",
                "#a385c2",
                "#9470b8",
                "#855cad",
                "#7547a3",
                "#663399",
                "#5c2e8a",
              ],
            },
            colorScheme: preferredColorScheme,
            primaryColor: "rebeccapurple",
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <RemixNavigationProgress />
          {children}
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
