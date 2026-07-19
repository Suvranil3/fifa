# StadiumAI API Documentation

- **Base URL:** `http://localhost:5000/api`
- **Authentication:** Most endpoints require a Bearer token in the `Authorization` header.

```http
Authorization: Bearer <your_jwt_token>
```

---

## Authentication

### `POST /auth/register`
Register a new user.
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "username": "fan123",
    "email": "fan@example.com",
    "password": "password123",
    "role": "fan",
    "full_name": "Fan Name"
  }
  ```
- **Response:** `201 Created`
  ```json
  { "message": "User registered successfully", "userId": 1 }
  ```

### `POST /auth/login`
Authenticate a user.
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "email": "fan@example.com",
    "password": "password123"
  }
  ```
- **Response:** `200 OK`
  ```json
  { "token": "eyJhb...", "user": { "id": 1, "role": "fan" } }
  ```

### `GET /auth/profile`
Get current user profile.
- **Auth Required:** Yes

---

## Crowd Management

### `GET /crowd`
Get current crowd data for all gates.
- **Auth Required:** Yes
- **Response:** Array of crowd data objects.

### `GET /crowd/heatmap`
Get spatial density data for mapping.
- **Auth Required:** Yes

### `GET /crowd/predictions`
Get AI-predicted crowd levels for the next 30-60 minutes.
- **Auth Required:** Yes

### `GET /crowd/gate/:id`
Get historical and current data for a specific gate.
- **Auth Required:** Yes

---

## Navigation & Facilities

### `GET /navigation/gates`
List all gates and their current status/wait times.
- **Auth Required:** Yes

### `GET /navigation/food`
List food stalls, wait times, and filter by dietary needs.
- **Auth Required:** Yes

### `GET /navigation/medical`
List nearest medical stations.
- **Auth Required:** Yes

### `GET /navigation/seat/:seatId`
Get routing instructions to a specific seat.
- **Auth Required:** Yes

---

## AI Features

### `POST /ai/chat`
Ask the Gemini AI assistant a question.
- **Auth Required:** Yes
- **Request Body:**
  ```json
  { "message": "Where is the nearest halal food?" }
  ```
- **Response:**
  ```json
  { "reply": "The nearest halal food stall is 'Halal Guys' in Zone B." }
  ```

### `POST /ai/translate`
Translate text.
- **Auth Required:** Yes

### `POST /ai/crowd-predict`
Generate a custom crowd prediction report.
- **Auth Required:** Yes (Organizer/Admin)

### `POST /ai/accessibility`
Get accessibility routing based on user needs.
- **Auth Required:** Yes

---

## Reports & Analytics

### `GET /reports`
List all generated reports.
- **Auth Required:** Yes (Organizer/Admin)

### `POST /reports/generate`
Trigger AI generation of a new report.
- **Auth Required:** Yes (Organizer/Admin)

### `GET /reports/:id`
Get a specific report.
- **Auth Required:** Yes (Organizer/Admin)

---

## Announcements

### `GET /announcements`
List active announcements.
- **Auth Required:** Yes

### `POST /announcements`
Create a manual announcement.
- **Auth Required:** Yes (Organizer/Admin)

### `POST /announcements/generate`
Use AI to draft an announcement based on an incident or event.
- **Auth Required:** Yes (Organizer/Admin)

---

## Volunteer Management

### `GET /volunteers`
List all volunteers and their status.
- **Auth Required:** Yes (Organizer/Admin)

### `POST /volunteers/deploy`
Assign a volunteer to a zone or incident.
- **Auth Required:** Yes (Organizer/Admin)

### `GET /volunteers/suggestions`
Get AI suggestions for volunteer deployment based on crowd data.
- **Auth Required:** Yes (Organizer/Admin)

---

## Emergency & Incidents

### `GET /emergency/incidents`
List reported incidents.
- **Auth Required:** Yes (Organizer/Admin)

### `POST /emergency/incidents`
Report an incident.
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "type": "medical",
    "description": "Fan injured at Gate A1",
    "severity": "high"
  }
  ```

### `GET /emergency/medical-stations`
List all medical stations and their capacities.
- **Auth Required:** Yes

### `POST /emergency/lost-found`
Report a lost or found item.
- **Auth Required:** Yes
