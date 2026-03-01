
# Social Media Platform

**Demo video (click image):**  
[![Watch the video](https://img.youtube.com/vi/nKhiJRHbc6g/maxresdefault.jpg)](https://youtu.be/nKhiJRHbc6g)


---

## Overview
This repository contains the **frontend web application** for a social media platform. The application works together with a separate backend API server (see the related API repository) to provide user authentication, posts, and profile interactions.

The focus of this project is on learning full‑stack architecture, client-server communication, and integration with GraphQL APIs.

---

## Features
- User authentication (sign up, sign in, sign out)  
- Create and display posts with images or text  
- Edit and update user profile data  
- Responsive UI for various screen sizes  
- Navigation through user feeds and profiles  
- Demo video shows full interaction flows

---

## Architecture
This project is implemented purely as the **frontend client**. It communicates with a backend API server that handles database access, authentication, and data operations.

See the companion repository:
- `social-media-platform-api` – the backend API server supporting this frontend

---

## Tech Stack

### Frontend
- Next.js (React framework)
- Apollo Client with WebSockets (GraphQL client)
- TypeScript
- Jotai (state management)
- shadcn UI components
- iron‑session (session management)

---

## Getting Started

### Prerequisites
- Node.js (recommended version)
- Yarn or npm for package management

### Setup
1. Clone this repo  
   ```bash
   git clone https://github.com/artemisia0/social-media-platform.git
   cd social-media-platform

## Purpose
This project was built as a **learning and portfolio application** to practice real-time communication, full-stack development, and GraphQL integration. It is not intended for production use.
