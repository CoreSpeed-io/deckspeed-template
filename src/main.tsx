import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";

import "./styles.css";

import App from "./App.tsx";
import metadata from "./slides/metadata.json";
import type { DeckMetadata } from "./types/slides";
import { Slide } from "./components/Slide.tsx";

const typedMetadata = metadata as DeckMetadata;

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const validateSearchParams = (search: Record<string, unknown>) => {
  if (Object.keys(search).length > 0) {
    const thumbnailValue = search.thumbnail;
    return { thumbnail: thumbnailValue === true || thumbnailValue === "true" };
  }
  return null;
};

// Create routes for each slide by ID
const slideByIdRoutes = Object.keys(typedMetadata.order).map((slideId) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: `/by-id/${slideId}`,
    component: () => <Slide id={slideId} />,
    validateSearch: validateSearchParams,
  })
);

// Create routes for each slide by index
const slideByIndexRoutes = Object.entries(typedMetadata.order).map(
  ([_slideId, index]) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path: `/by-index/${index}`,
      component: () => <Slide index={index as number} />,
      validateSearch: validateSearchParams,
    }),
);

const routeTree = rootRoute.addChildren([
  indexRoute,
  ...slideByIdRoutes,
  ...slideByIndexRoutes,
]);

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
