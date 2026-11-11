import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ThemeToggle } from "@/components/ThemeToggle";
import { nextTheme, readStoredTheme } from "@/lib/theme";

describe("theme helpers", () => {
  it("flips between light and dark", () => {
    expect(nextTheme(true)).toBe("light");
    expect(nextTheme(false)).toBe("dark");
  });

  it("ignores unknown or unavailable stored values", () => {
    expect(readStoredTheme({ getItem: () => "dark" })).toBe("dark");
    expect(readStoredTheme({ getItem: () => "purple" })).toBeNull();
    expect(
      readStoredTheme({
        getItem: () => {
          throw new Error("denied");
        },
      }),
    ).toBeNull();
    expect(readStoredTheme(undefined)).toBeNull();
  });
});

describe("ThemeToggle", () => {
  it("toggles the dark class, updates aria-pressed and persists the choice", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: "Dark mode" });
    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.click(button);
    expect(document.documentElement).toHaveClass("dark");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(localStorage.getItem("theme")).toBe("dark");

    await user.click(button);
    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
