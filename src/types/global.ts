import { JSX } from "react";

declare global {
  interface MenuRouter {
    auth?: boolean;
    path: string;
    element: JSX.Element;
  }
}

export {};