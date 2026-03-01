# Real-Time Chat Website

**Demo video (click image):**  
[![Watch the video](https://img.youtube.com/vi/nKhiJRHbc6g/maxresdefault.jpg)](https://youtu.be/nKhiJRHbc6g)

---

## Overview
This project is a real-time chat web application designed to demonstrate full-stack concepts including authentication, image posts, profile management, and real-time updates using WebSockets. The focus is on functionality and responsive design rather than production-level performance.

---

## Features
- User authentication: sign up, sign in, and sign out  
- Upload images with optional captions (like a post)  
- Edit profile information via a modal interface  
- Responsive web design for desktop and mobile  
- Additional features showcased in the demo video  

**Note:** Images are stored directly in the database, which may affect performance.

---

## Tech Stack

### Frontend
- Next.js  
- Apollo Client with WebSockets (GraphQL)  
- Jotai (state management)  
- Shadcn (UI library)

### Backend / Infrastructure
- iron-session (session management)  
- Separate API server deployed independently: `real-time-chat-api` repository

---

## Implementation Notes
- Frontend and backend are deployed on separate hosts  
- Demonstrates real-time messaging, state management, and user authentication workflows  

---

## Purpose
This project was built as a **learning and portfolio application** to practice real-time communication, full-stack development, and GraphQL integration. It is not intended for production use.
