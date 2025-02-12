# Fitness Tracker App

Visit the [Live app](https://ricoculo.vercel.app) to see the app in action.

This app is a part of the Fitness Tracker project, [here you can find the BE repo](https://github.com/radekskrabucha/fitness-tracker-be).

The frontend app is built with [my SolidStart template](https://github.com/radekskrabucha/solid-start-template).

## Features

- **SolidStart**: A framework for building SolidJS applications.
- **TypeScript**: A typed superset of JavaScript that adds optional static typing.
- **Tailwind CSS v4**: A utility-first CSS framework that provides a simple and efficient way to style your web pages.
- **Prettier**: A code formatter that enforces a consistent style across your codebase.
- **Tanstack SolidQuery**: A library for managing and querying data in SolidJS applications.
- **Sprite Icons**: Automatically generate icon-sprite.svg from SVG files.
- **Kobalte**: A UI toolkit for building accessible web apps and design systems with SolidJS.
- **Modular Forms**: A library for building forms in SolidJS applications.
- **Env Validation**: Validating environment variables with the help of the `@julr/vite-plugin-validate-env` plugin.
- **Vitest**: A testing framework for SolidJS applications.

## Getting Started

To get started with this app, follow these steps:

1. **Clone the repository**: Use the following command to clone the repository:

```bash
git clone git@github.com:radekskrabucha/fitness-tracker-fe.git
```

2. **Install dependencies**: Navigate to the project directory and run the following command to install the dependencies:

```bash
pnpm install
```

3. **Copy env file**: Copy the `.env.example` file to `.env` and fill in the values.

```bash
cp .env.example .env
```

4. **Start the development server**: Run the following command to start the development server:

```bash
pnpm dev
```

5. **Open the project in your browser**: Open your browser and navigate to `http://localhost:3000`. You should see the default SolidStart App Template in action.

## Scripts

This template comes with a few useful scripts that can help you manage your SolidJS project:

- `pnpm dev`: Starts the development server and opens your project in your default browser.
- `pnpm build`: Builds your project for production.
- `pnpm start`: Starts the production server.
- `pnpm test`: Runs the vitest tool to test your project.
- `pnpm lint`: Runs the ESLint tool to check for any errors or warnings.
- `pnpm lint:fix`: Runs the ESLint tool to automatically fix any errors or warnings.
- `pnpm format`: Formats your code using Prettier.
- `pnpm type-check`: Runs the TypeScript compiler to check for any type errors.
