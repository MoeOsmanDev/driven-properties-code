# Multi-Step Form Builder

This is a form builder I made that creates multi-step forms from a simple JSON file. It's built with Next.js and TypeScript.

## What This Does

Instead of writing HTML forms by hand, I can just describe what I want in a JSON file and the app builds the form automatically. The form breaks into steps so users don't get overwhelmed by a long form.

## How It Works

The main parts are:

- **form-schema.json** - This is where I write what fields I want, what type they are, and any rules
- **MultiStepForm.tsx** - The main component that shows the form and handles moving between steps
- **useMultiStepForm.ts** - A custom hook I wrote that manages all the form state and validation
- **validation.ts** - Uses Zod to check if the data people enter is correct

## The Form Steps

1. **Personal Info** - Name, email, phone
2. **Preferences** - What they like, how they heard about us
3. **Review** - Shows everything they entered so they can check it

## Field Types I Built

- **Text** - For names, emails, etc.
- **Number** - For ages, amounts, etc.
- **Select** - Dropdown menus
- **Checkbox** - Yes/no questions
- **Radio** - Multiple choice questions
- **Date** - Date picker
- **Group** - Bunch related fields together

## Cool Features

- Fields can depend on other fields (like showing a "company name" field only if they select "business" as customer type)
- Dropdown options can change based on what they picked in other fields
- The form remembers what they typed when they go back to previous steps
- Shows errors right away if they type something wrong
- Smooth animations when moving between steps

## How to Use

1. Run `npm install` to get the packages
2. Run `npm run dev` to start the app
3. Edit the `form-schema.json` file to change what the form looks like
4. The form automatically updates based on your changes

## What I Learned Making This

- How to use React Hook Form with custom validation
- How to make reusable form components
- How to manage complex state between multiple steps
- How to use TypeScript to catch errors before the app runs
- How to make forms that feel smooth and professional

## The Code Structure

components/forms/ - All the form components
├── MultiStepForm.tsx - Main form wrapper
├── FormSteps.tsx - Shows current step
├── StepContent.tsx - Renders fields for each step
├── FormNavigation.tsx - Next/Previous buttons
└── FormField/ - Individual field components

hooks/
└── useMultiStepForm.ts - Manages form state and logic

lib/
├── form-schema.json - Form configuration
├── validation.ts - Validation rules
└── types.ts - TypeScript definitions

This project shows how I can build complex forms without writing a lot of repetitive code. The JSON approach makes it easy to change the form without
touching the React components.

**Note to fix the Optimization here** it can only be fixed when we delete the useCallback from the line 214 bcz we are involking it to the next function below it as you can see, idont know how did i do it but we got to the point
