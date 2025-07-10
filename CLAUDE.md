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
- **Pages**: `src/pages/` - Contains page components (Layout.tsx, HomePage.tsx, ReservationsPage.tsx)
- **Components**: `src/components/` - Reusable UI components (Sidebar.tsx, Topbar.tsx)
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
- Inputs with icon are created using DaisyUIs label.input wrapper
- **Avatars**: Need to have the class `avatar-placeholder`, not `placeholder`. Always use initials as the content.

### Key Dependencies

- **Icons**: `lucide-react` - Always use the `XyzIcon` aliases
- **Date Utilities**: `date-fns` - For date manipulation and formatting
- **CSS Classes**: `classnames` - For conditional CSS class composition
- **Styling**: `daisyui` - UI component library for Tailwind CSS
- **React Router**: `react-router` v7 - For declarative routing

## Project Context

- This is a backoffice prototype of a serviced apartment building. The target group are young professionals. Most are staying mid term, i.e. a couple of months up to a year.