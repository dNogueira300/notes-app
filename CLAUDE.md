# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React-based notes application (similar to sticky notes/post-its) with Supabase backend authentication. Built with TypeScript, React 19, Vite, Tailwind CSS v4, and Zustand for state management.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### State Management

**Zustand with Persistence**: The app uses Zustand stores with the `persist` middleware for client-side state.

- `src/stores/authStore.ts`: Manages authentication state (user, isLoading, isAuthenticated) and auth actions (signUp, signIn, signOut). Persists user and isAuthenticated to localStorage under "auth-storage".

### Authentication Flow

1. **AuthProvider** (`src/components/auth/AuthProvider.tsx`): Top-level component wrapping the app in `main.tsx`. On mount, it:
   - Checks for existing Supabase session via `supabase.auth.getSession()`
   - Subscribes to auth state changes with `supabase.auth.onAuthStateChange()`
   - Updates the authStore accordingly

2. **Supabase Client** (`src/lib/supabase.ts`): Configured with:
   - Environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (from `.env`)
   - Auto-refresh tokens, persist sessions, detect sessions in URL

3. **User Flow**: App.tsx renders different UIs based on authentication:
   - Loading state: Shows spinner
   - Unauthenticated: Landing page with LoginButton
   - Authenticated: Main app with UserProfile in header

### Type System

**Database Types** (`src/types/database.ts`): Auto-generated Supabase schema types for the `notes` table.

**Application Types** (`src/types/index.ts`): Domain types including:
- Note types: `Note`, `NoteInsert`, `NoteUpdate` (derived from Database types)
- `NoteColor`: Union type of 8 color options
- `NoteColorOption`: Color metadata (name, value, Tailwind classes)
- Form, theme, search, and notification types

**Constants** (`src/utils/constants.ts`): Exported `NOTE_COLORS` array with Tailwind class mappings for each color.

### Styling

**Tailwind CSS v4**: Configured via PostCSS plugin in `vite.config.ts`. Custom animations defined in `tailwind.config.js`:
- `fadeIn`: Opacity transition
- `slideUp`: Slide up with scale effect

The UI heavily uses:
- Linear gradients (`bg-linear-to-br`)
- Backdrop blur effects (`backdrop-blur-xl`)
- Custom color palettes (violet, purple, yellow themes)
- Dark mode support (planned via `dark:` utilities)

### Dependencies

Key libraries:
- **@supabase/supabase-js**: Backend authentication and database
- **zustand**: State management with persistence
- **@tanstack/react-query**: Data fetching (prepared for notes CRUD)
- **fuse.js**: Fuzzy search for notes
- **react-hook-form**: Form handling
- **react-hot-toast**: Notifications
- **lucide-react**: Icon library
- **@headlessui/react**: Accessible UI components

## Environment Setup

Required environment variables in `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Current Implementation Status

The project has completed Phase 5 (authentication system). The core note-taking features (CRUD operations, search, color filtering) are defined in types but not yet implemented.

## Code Conventions

- TypeScript strict mode enabled
- React 19 with Vite for fast HMR
- Component structure: `src/components/{feature}/{Component}.tsx`
- Utilities: `src/utils/`, Libraries: `src/lib/`, Types: `src/types/`
- ESLint configured with React Hooks rules and TypeScript recommended rules
