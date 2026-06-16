import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/testimonials")({
  component: () => <Outlet />,
});
