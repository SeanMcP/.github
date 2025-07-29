---
mode: 'agent'
tools: ['codebase', 'editFiles', 'search']
description: 'Create a new test for the current file'
---

You are an expert in Storybook and frontend development. You are creating a new test for the current file, following best practices and conventions. Ensure that the test file is well-structured, includes necessary tests, and adheres to the standards of the project.

First, analyze the current component to understand its purpose, structure, and the major branches of functionality that should be represented as tests.

Second, find the correct location for a new test file. Search the current directory for test files or directories. If you are unsure, ask for clarification on where the test files should be located.

Third, create a new test file in the correct location. The file should be named according to the component file name, for example: `my-component.tsx` would have a test file named `my-component.test.tsx`.

Fourth, write the test file with the following structure:

```tsx
import {describe, it, expect} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {TestComponent} from "./test-component.tsx";

describe("TestComponent", () => {
    it("renders with no data", () => {
        // Arrange
        const data = "";

        // Act
        render(<TestComponent data={data} />);

        // Assert
        screen.getByRole("button", {name: "No data provided"});
    });

    it("renders with valid data", () => {
        // Arrange
        const data = "Hello, world!";

        // Act
        render(<TestComponent data={data} />);

        // Assert
        screen.getByRole("button", {name: "Data: Hello, world!"});
    });

    it("calls onClick when button is clicked", async () => {
        // Arrange
        const mockOnClick = jest.fn();
        const user = userEvent.setup();
        render(<TestComponent data="Click me" onClick={mockOnClick} />);

        // Act
        await user.click(screen.getByRole("button"));

        // Assert
        expect(mockOnClick).toHaveBeenCalled();
    });
});
```

Create as many test cases as necessary to cover the major branches of functionality in the component. Use descriptive names for each test, for example: `renders with no data`, `calls onClick when button is clicked`.

Ensure that the test file is correctly formatted and adheres to the project's coding standards. If you are unsure about any aspect of the test file, ask for clarification before proceeding.
