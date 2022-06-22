import { HoldingPage } from ".";
import { render, screen } from "@testing-library/react";

describe("Holding page", () => {
  it("should display an icon", () => {
    render(
      <HoldingPage
        icon={<i>Not Found Icon</i>}
        title={"404 Not Found"}
        content={"We were unable to find that page"}
        button={<button>Go back</button>}
        additionalSectionTitle={"Need help?"}
        additionalSectionContent={
          <>
            Contact us on <a href="tel:0123-123-1234">0123 123 1234</a>
          </>
        }
      />
    );

    expect(screen.getByText(/not found icon/i)).toBeInTheDocument();
  });

  it("should display a title", () => {
    render(
      <HoldingPage
        icon={<i>Not Found Icon</i>}
        title={"404 Not Found"}
        content={"We were unable to find that page"}
        button={<button>Go back</button>}
        additionalSectionTitle={"Need help?"}
        additionalSectionContent={
          <>
            Contact us on <a href="tel:0123-123-1234">0123 123 1234</a>
          </>
        }
      />
    );

    expect(
      screen.getByRole("heading", { name: /404 not found/i })
    ).toBeInTheDocument();
  });

  it("should render content", () => {
    render(
      <HoldingPage
        icon={<i>Not Found Icon</i>}
        title={"404 Not Found"}
        content={"We were unable to find that page"}
        button={<button>Go back</button>}
        additionalSectionTitle={"Need help?"}
        additionalSectionContent={
          <>
            Contact us on <a href="tel:0123-123-1234">0123 123 1234</a>
          </>
        }
      />
    );

    expect(
      screen.getByText(/we were unable to find that page/i)
    ).toBeInTheDocument();
  });

  it("should display a button", () => {
    render(
      <HoldingPage
        icon={<i>Not Found Icon</i>}
        title={"404 Not Found"}
        content={"We were unable to find that page"}
        button={<button>Go back</button>}
        additionalSectionTitle={"Need help?"}
        additionalSectionContent={
          <>
            Contact us on <a href="tel:0123-123-1234">0123 123 1234</a>
          </>
        }
      />
    );

    expect(
      screen.getByRole("button", { name: /go back/i })
    ).toBeInTheDocument();
  });

  describe("when showAdditionalSection is true", () => {
    it("should show an additional section title", () => {
      render(
        <HoldingPage
          icon={<i>Not Found Icon</i>}
          title={"404 Not Found"}
          content={"We were unable to find that page"}
          button={<button>Go back</button>}
          additionalSectionTitle={"Need help?"}
          additionalSectionContent={
            <>
              Contact us on <a href="tel:0123-123-1234">0123 123 1234</a>
            </>
          }
        />
      );

      expect(
        screen.getByRole("heading", { name: /need help\?/i })
      ).toBeInTheDocument();
    });

    it("should show additional section content", () => {
      render(
        <HoldingPage
          icon={<i>Not Found Icon</i>}
          title={"404 Not Found"}
          content={"We were unable to find that page"}
          button={<button>Go back</button>}
          additionalSectionTitle={"Need help?"}
          additionalSectionContent={
            <>
              Contact us on <a href="tel:0123-123-1234">0123 123 1234</a>
            </>
          }
        />
      );

      expect(screen.getByText(/contact us on/i)).toBeInTheDocument();
    });
  });

  describe("when showAdditionalSection is false", () => {
    it("should NOT show an additional section title", () => {
      render(
        <HoldingPage
          icon={<i>Not Found Icon</i>}
          title={"404 Not Found"}
          content={"We were unable to find that page"}
          button={<button>Go back</button>}
          showAdditionalSection={false}
          additionalSectionTitle={"Need help?"}
          additionalSectionContent={
            <>
              Contact us on <a href="tel:0123-123-1234">0123 123 1234</a>
            </>
          }
        />
      );

      expect(screen.queryByText(/need help\?/i)).not.toBeInTheDocument();
    });

    it("should NOT show additional section content", () => {
      render(
        <HoldingPage
          icon={<i>Not Found Icon</i>}
          title={"404 Not Found"}
          content={"We were unable to find that page"}
          button={<button>Go back</button>}
          showAdditionalSection={false}
          additionalSectionTitle={"Need help?"}
          additionalSectionContent={
            <>
              Contact us on <a href="tel:0123-123-1234">0123 123 1234</a>
            </>
          }
        />
      );

      expect(screen.queryByText(/contact us on/i)).not.toBeInTheDocument();
    });
  });
});
