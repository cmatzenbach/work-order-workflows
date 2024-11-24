import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { EditInput } from "../general/EditInput";

describe("EditInput Component", () => {
  const mockOnSubmitValue = jest.fn();
  const mockCancelEditing = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input with initial value from savedValue", () => {
    render(
      <EditInput
        savedValue="Test"
        onSubmitValue={mockOnSubmitValue}
        cancelEditing={mockCancelEditing}
        editing={true}
      />
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Test");
  });

  test("calls onSubmitValue and cancelEditing when Enter is pressed", () => {
    render(
      <EditInput
        savedValue="Test"
        onSubmitValue={mockOnSubmitValue}
        cancelEditing={mockCancelEditing}
        editing={true}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Value" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnSubmitValue).toHaveBeenCalledWith("New Value");
    expect(mockCancelEditing).toHaveBeenCalled();
  });

  test("calls cancelEditing when Escape is pressed", () => {
    render(
      <EditInput
        savedValue="Test"
        onSubmitValue={mockOnSubmitValue}
        cancelEditing={mockCancelEditing}
        editing={true}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Escape" });

    expect(mockCancelEditing).toHaveBeenCalled();
    expect(mockOnSubmitValue).not.toHaveBeenCalled();
  });

  test("calls onSubmitValue and cancelEditing on blur", () => {
    render(
      <EditInput
        savedValue="Test"
        onSubmitValue={mockOnSubmitValue}
        cancelEditing={mockCancelEditing}
        editing={true}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Blur Value" } });
    fireEvent.blur(input);

    expect(mockOnSubmitValue).toHaveBeenCalledWith("Blur Value");
    expect(mockCancelEditing).toHaveBeenCalled();
  });

  test("disables input when editing is false", () => {
    render(
      <EditInput
        savedValue="Test"
        onSubmitValue={mockOnSubmitValue}
        cancelEditing={mockCancelEditing}
        editing={false}
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });
});
