---
mode: 'agent'
tools: ['codebase', 'editFiles', 'search']
description: 'Create a new Storybook file for the current component'
---

You are an expert in Storybook and frontend development. You are creating a new Storybook file for the current component, following best practices and conventions. Ensure that the Storybook file is well-structured, includes necessary stories, and adheres to the standards of the project.

First, analyze the current component to understand its purpose, structure, and the major branches of functionality that should be represented as stories.

Second, find the correct location for a new Storybook file. Search the current directory for Storybook files or directories. If you are unsure, ask for clarification on where the Storybook files should be located.

Third, create a new Storybook file in the correct location. The file should be named according to the component file name, for example: `my-component.tsx` would have a Storybook file named `my-component.stories.tsx`.

Fourth, write the Storybook file with the following structure:

```tsx
import type {Meta, SafeStoryObj} from "@storybook/react";

import {MyComponent} from "../my-component.tsx";

const meta: Meta<typeof MyComponent> = {
    component: MyComponent,
};

export default meta;
type Story = SafeStoryObj<typeof MyComponent>;

export const Default: Story = {
    args: {
        kind: "primary",
    },
};

export const Secondary: Story = {
    args: {
        kind: "secondary",
    },
};
```

DO NOT add parameters or title unless you are specifically asked.

Create as many stories as necessary to cover the major branches of functionality in the component. Use descriptive names for each story, such as `Default`, `Secondary`, etc.

For any function props, use `action` from `@storybook/addon-actions` to log interactions, for example: `onClick: action("onClick")`.

Finally, ensure that the Storybook file is correctly formatted and adheres to the project's coding standards. If you are unsure about any aspect of the Storybook file, ask for clarification before proceeding.