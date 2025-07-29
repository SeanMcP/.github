# Component Creation Agent Model Evaluations

## Brief

> Create a new component called CopyButton in apps/assessments/ that extends Wonder Block's Button by adding a click handler that copies a provided string to the clipboard. The label of the button should change from Copy to Copied after it has been selected. Create a Storybook file with a default story. Create a test file with two test cases: 1) that the text is copied to the clipboard, and 2) that the label changes after clicking.

The org-wide `frontend-rules.instructions.md` instructions were included in the prompt.

## Context

- The `apps/assessments/` directory uses `__tests__/` and `__stories__/` for organizing files

## Evaluation

| Model             | Component | Story | Test | Time |
| ----------------- | --------- | ----- | ---- | ---- |
| gpt-4o            | 🟡        | 🔴    | 🟢   | 🟢   |
| gpt-4.1           | 🟡        | 🟡    | 🟢   | 🟢   |
| claude-sonnet-3.5 | 🟡        | 🟢    | 🟢   | 🟢   |
| claude-sonnet-3.7 | 🟡🟢      | 🟡    | 🟡   | 🔴   |
| claude-sonnet-4   | 🟢        | 🔴    | 🟡   | 🔴   |
| gemini-2.5-pro    | 🟡        | 🟢    | 🟡   | 🟡   |
| o4-mini           | 🟡        | 🟢    | 🟡   | 🟢   |

### gpt-4o

- Component: Filename didn't follow pattern
- Component: Used `setTimeout` to change label back
- Component: Disabled button on click
- Test: Didn't import jest globals
- Stories: Used some crazy format

### gpt-4.1

- Component: Added lots of comments
- Component: Used `setTimeout` to change label back
- Tests: Wrong directory
- Stories: Wrong directory
- Stories: Extra meta data

### claude-sonnet-3.5

- Component: Added lots of comments
- Component: Added unnecessary props
- Component: Fallback if clipboard API is not available
- Test: Imported jest globals

### claude-sonnet-3.7

- Component: Lots of comments
- Component: Unnecessary props
- Component: Used `useTimeout` from WB
- Component: Added unnecessary styles
- Component: Double fallback for clipboard API
- Test: Mocked clipboard API
- Test: Used `fireEvent` instead of `userEvent`
- Test: Added extra cases
- Stories: Added unnecessary stories
- Time: Took a lot more time to "think" through the assignment and looked up more information in the form of instruction and project files.
- Time: Looked up TS & lint issues and then attempted to fix them.
- Time: Copilot hit time limit and asked for confirmation to continue.

### claude-sonnet-4

- Component: Lots of comments
- Component: Reasonable additional props
- Component: Used `useTimeout` from WB
- Component: Double fallback for clipboard API
- Component: Used `i18n` functions
- Test: Didn't import jest globals
- Test: Used `fireEvent` instead of `userEvent`
- Stories: Bungled it, asked to delete and start over, never resumed
- Time: Similar to 3.7, but maybe a little faster?

### gemini-2.5-pro

- Component: Unused imports
- Component: Didn't await `clipboard.writeText`
- Component: Added unnecessary styles
- Test: Wrong directory
- Test: Didn't import jest globals
- Test: Didn't handle async events

### o4-mini

- Component: Didn't use `useCallback` for click handler
- Component: Left `console.error` with invalid disabled comment
- Component: Created a good component prop type that extends `Button` props
- Test: Didn't import jest globals
- Test: Used `fireEvent` instead of `userEvent`
- Stories: Unused imports

## Conclusion

- For the best overall experience generating a component, tests, and stories in one shot, `claude-sonnet-3.5` was superior.
- For generation, less was more. It's much easier for me to identify code that needed to be added than it was code that needed to be removed.
- The models (VS Code?) were less likely to pick up on additional instructions. Consider adding them all (_e.g._ for tests and stories) explicitly.
- The iterations from `claude-sonnet-3.7` and `claude-sonnet-4` were slower, but they did produce more-complete code. I would probably prefer them if I were working on a single file.
