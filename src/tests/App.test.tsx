import React from "react";
import { render } from "@testing-library/react";
import AppRouter from "../layout/components/appRouter";

test("renders learn react link", () => {
  const { getByText } = render(<AppRouter />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
