import { render } from "@testing-library/react";
import { CategoryList } from "./category-list";

describe("CategoryList", () => {
  it("renders heading", () => {
    const { getByText } = render(<CategoryList />);
    expect(getByText(/Categorias/i)).toBeDefined();
  });
});
