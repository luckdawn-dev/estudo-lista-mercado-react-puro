import { render, screen } from "@testing-library/react";
import { CategoryList } from "./category-list";

describe("CategoryList", () => {
  it("renders heading", () => {
    render(<CategoryList />);
    expect(screen.getByText(/Categorias/i)).toBeInTheDocument();
  });
});
