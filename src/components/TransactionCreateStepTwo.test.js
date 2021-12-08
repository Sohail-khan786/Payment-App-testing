import { render, screen } from "@testing-library/react";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";
import userEvent from "@testing-library/user-event";

test("Enable pay button once amount and not are added by user", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "sohail" }} receiver={{ id: "viraj" }} />);

  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "learning testing");

  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});
