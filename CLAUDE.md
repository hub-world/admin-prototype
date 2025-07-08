# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `npm run dev` - Start development server with Vite and HMR
- `npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `npm run lint` - Run ESLint on the codebase
- `npm run preview` - Preview the production build locally
- `npm run format` - Format all files with Prettier (includes import sorting and Tailwind class ordering)

### Type Checking

- `tsc -b` - Run TypeScript compiler (included in build command)

## Architecture

This is a React + TypeScript + Vite admin prototype application using modern Tailwind CSS v4 and DaisyUI:

### Core Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite with Fast Refresh/HMR
- **Routing**: React Router v7 with declarative API
- **Styling**: Tailwind CSS v4 with DaisyUI plugin
- **Linting**: ESLint with React-specific rules
- **Formatting**: Prettier with import sorting and Tailwind class ordering

### Application Structure

- **Entry Point**: `src/main.tsx` - Sets up React with BrowserRouter
- **Root Component**: `src/App.tsx` - Contains routing configuration with Layout wrapper
- **Pages**: `src/pages/` - Contains page components (Layout.tsx, HomePage.tsx)
- **Styling**: `src/index.css` - Tailwind CSS imports with DaisyUI plugin

### Key Configuration

- **Vite**: Uses `@tailwindcss/vite` plugin for Tailwind CSS v4, includes path alias `~` for `/src`
- **Tailwind CSS**: v4 with DaisyUI plugin, configured via `@import` and `@plugin` directives
- **Prettier**: Configured with import sorting and Tailwind class ordering plugins
- **TypeScript**: Split configuration (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`)

### Development Notes

- Uses React Router v7's declarative routing approach
- Tailwind CSS v4 syntax with DaisyUI component library
- Prettier automatically sorts imports and orders Tailwind classes
- Path alias `~` available for cleaner imports from src directory
- Use the package `classnames` instead of string interpolation for CSS class composition

### Icon Library Notes

- When using `lucide-react` always take the `XyzIcon` aliases
