# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- Frontend: `npm run dev` (development), `npm run build` (production), `npm run start` (production server)
- Backend: `./mvnw spring-boot:run` (run app), `./mvnw clean install` (build)

## Test Commands
- Frontend: No specific test command found
- Backend: `./mvnw test` (all tests), `./mvnw test -Dtest=TestClassName` (single test)

## Lint Commands
- Frontend: `npm run lint`
- Backend: No specific lint command found

## Code Style Guidelines
- Frontend: Use TypeScript with proper type definitions, follow Next.js file-based routing conventions
- Components: Create reusable components in src/components, separate UI from business logic
- Backend: Follow Spring Boot conventions, use JPA for persistence, organize code by domain/modules
- Naming: Use camelCase for variables, PascalCase for components/classes, kebab-case for files
- Error handling: Use custom exception classes for backend, proper error states for frontend components

## Architecture Pattern
- Frontend: React components with hooks for state management
- Backend: Modular architecture with controllers, entities, repositories, and use cases