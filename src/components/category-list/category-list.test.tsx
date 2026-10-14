import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CategoryList } from "./category-list";

describe("CategoryList", () => {
  it("renders heading", () => {
    const queryClient = new QueryClient();
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <CategoryList />
      </QueryClientProvider>
    );
    expect(getByText(/Categorias/i)).toBeDefined();
  });
});
