# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

# 🧠 CLAUDE.md

## Project: Dentify – Smart Dental CRM Platform

---

## 📌 Project Overview

Dentify is a full-stack dental CRM platform built using Next.js. It provides a public-facing website for patients and a private CRM dashboard for clinic administrators to manage patients, appointments, and services.

This project follows a modern full-stack architecture where frontend and backend are handled within Next.js.

---

## 🎯 Goals

- Build a scalable full-stack application using Next.js
- Provide seamless appointment booking for patients
- Centralize all clinic data in a CRM dashboard
- Maintain clean, modular, and maintainable code

---

## 🏗️ Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Database: PostgreSQL (preferred) or MongoDB
- ORM: Prisma
- Authentication: Auth.js (NextAuth)
- Deployment: Vercel

---

## 📁 Project Structure

/app
  /(public)
  /about
  /services
  /contact
  /book

  /dashboard
    /appointments
    /patients
    /services
    /analytics

  /api

/components
/lib
  /db
  /auth
  /utils

/prisma
/styles

---

## 👥 User Roles

### Public User (Patient)
- Browse website content
- Book appointments
- Contact clinic

### Admin (CRM User)
- Manage appointments
- Manage patients
- Manage services
- View analytics

---

## 🧩 Core Features

### 1. Public Website
- SEO-optimized pages
- Service listings
- Dentist profile
- Appointment booking form

### 2. Appointment System
- Book by selecting service, date, and time
- Store appointment in database
- Link appointment to patient

### 3. CRM Dashboard
- Secure admin login
- Appointment management
- Patient records
- Service management

---

## 🗄️ Database Models (Conceptual)

- User (Admin)
- Patient
- Appointment
- Service
- Testimonial
- BlogPost

---

## 🧠 Coding Guidelines

- Use TypeScript everywhere
- Prefer server components when possible
- Use client components only when necessary
- Keep components small and reusable
- Use proper folder separation (feature-based if needed)

---

## 🔐 Security Guidelines

- Validate all inputs (use Zod)
- Protect admin routes
- Never expose sensitive data
- Use environment variables for secrets

---

## 📅 API Design Principles

- Use RESTful structure via Next.js API routes
- Keep business logic in `/lib`
- Use Prisma for all DB operations
- Return consistent JSON responses

---

## 🎨 UI/UX Guidelines

- Mobile-first design
- Clean medical-style UI
- Use consistent spacing and typography
- Clear CTA buttons (e.g., "Book Appointment")

---

## ⚡ Performance Guidelines

- Use server-side rendering when possible
- Optimize images with next/image
- Avoid unnecessary client-side JS
- Lazy load heavy components

---

## 🧪 Testing (Optional)

- Unit tests for core logic
- Component tests for UI
- E2E tests for booking flow

---

## 🚀 Development Phases

### Phase 1 (MVP)
- Public website
- Appointment booking
- Basic CRM dashboard

### Phase 2
- Authentication system
- Full CRUD for all entities

### Phase 3
- Notifications (email/SMS)
- Analytics dashboard

---

## 🔮 Future Scope

- AI chatbot integration
- Online payments
- Patient login dashboard
- Multi-language support

---

## 🧠 Notes for AI Assistants (Claude / Cursor)

- Always follow the existing folder structure
- Prefer Prisma for database operations
- Do not introduce unnecessary libraries
- Keep code simple and readable
- Maintain consistency with naming conventions

---

## 📌 Final Vision

Dentify is designed to be a scalable, modern dental CRM platform that enhances both patient experience and clinic operations through clean architecture and efficient workflows.

---