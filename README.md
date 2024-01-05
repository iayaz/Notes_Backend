

```
# Note Management App

This application allows users to manage their notes and share them with other users.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Endpoints](#endpoints)


## Introduction

The Note Management App is a full-stack application built with Node.js, Express, and MongoDB. It provides a user-friendly interface for managing personal notes and sharing them with others.

## Features

- User authentication (signup and login)
- Create, read, update, and delete (CRUD) operations for notes
- Share notes with other users
- Search functionality based on keywords

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/iayaz/Notes_Backend.git
   ```

2. **Install Dependencies:**

   ```bash
   cd notes_backend
   npm install
   ```

3. **Set up Environment Variables:**

   Create a .env file in the root directory and add the following:

   ```bash
   DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=your_preferred_port
   ```

4. **Running the Application:**

   ```bash
   npm start
   ```

## Usage

### Endpoints

#### Authentication

- `POST /api/auth/signup`: Create a new user.
- `POST /api/auth/login`: Authenticate and get a JWT token.

#### Notes

- `GET /api/notes`: Get all notes for the authenticated user.
- `GET /api/notes/:id`: Get a note by ID.
- `POST /api/notes`: Create a new note.
- `PUT /api/notes/:id`: Update a note by ID.
- `DELETE /api/notes/:id`: Delete a note by ID.
- `POST /api/notes/:id/share`: Share a note with another user.
- `GET /api/search?q=:query`: Search for notes based on keywords.

```

