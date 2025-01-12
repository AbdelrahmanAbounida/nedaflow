import { expect, it, test, describe } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react";
import { Counter, sumNumbers } from "./counter";

describe("Sum function with 3 numbers", () => {
  test("add 1,2,3 to be 6", () => {
    expect(sumNumbers(1, 2)).toBe(3);
  });
});

describe("Sum function with 5 numbers", () => {
  test("add 1,2,3,4,5 to be 15", () => {
    expect(sumNumbers(1, 2, 3, 4, 5)).toBe(15);
  });
});

// counter component

describe(Counter, () => {
  it("counter display inital count zero if no passed", () => {
    const { getByTestId } = render(<Counter />);
    const counterViewedState = getByTestId("countState").textContent;

    expect(counterViewedState).toEqual(`Current Count = 0`);
  });

  it("count should increment by one when clicking on increment button", () => {
    const { getByTestId, getByRole } = render(<Counter initalCount={1} />); // count state
    const incrementBtn = getByRole("button", { name: "increment" });

    const value1 = getByTestId("countState").textContent;
    expect(value1).toEqual(`Current Count = 1`);

    fireEvent.click(incrementBtn); // click on increment

    const value2 = getByTestId("countState").textContent;
    expect(value2).toEqual(`Current Count = 2`);
  });

  it("count should decrement by one when clicking on decrement button", () => {
    const { getByTestId, getByRole } = render(<Counter initalCount={1} />); // count state
    const decrementBtn = getByRole("button", { name: "decrement" });

    const value1 = getByTestId("countState").textContent;
    expect(value1).toEqual(`Current Count = 1`);

    fireEvent.click(decrementBtn); // click on decrementBtn

    const value2 = getByTestId("countState").textContent;
    expect(value2).toEqual(`Current Count = 0`);
  });

  it("count sign should be converted when count state is non zero and change sign button clicked", () => {
    const { getByTestId, getByRole } = render(<Counter initalCount={1} />); // count state
    const changeSignBtn = getByRole("button", { name: "change Sign" });

    const value1 = getByTestId("countState").textContent;
    expect(value1).toEqual(`Current Count = 1`);

    fireEvent.click(changeSignBtn); // click on increment

    const value2 = getByTestId("countState").textContent;
    expect(value2).toEqual(`Current Count = -1`);
  });

  it("Count state should resetted to inital count state when reset button clicked", () => {
    const { getByTestId, getByRole } = render(<Counter initalCount={1} />); // count state
    const incrementBtn = getByRole("button", { name: "increment" });
    const resetBtn = getByRole("button", { name: "reset" });

    const value1 = getByTestId("countState").textContent;
    expect(value1).toEqual(`Current Count = 1`);

    fireEvent.click(incrementBtn); // click on increment
    fireEvent.click(incrementBtn); // click on increment
    fireEvent.click(resetBtn); // click on reset

    const value2 = getByTestId("countState").textContent;
    expect(value2).toEqual(`Current Count = 1`);
  });
});
