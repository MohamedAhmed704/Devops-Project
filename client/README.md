
This is the frontend client for the **Tadbir** application, a modern workforce management platform. It is built with **React 19**, **Vite**, and **Tailwind CSS v4**.

##  Getting Started

### Prerequisites
-   Node.js (v18+ recommended)
-   npm or yarn

### Installation

1.  Navigate to the client directory:
    ```bash
    cd client
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    -   Create a `.env` file in the `client` root.
    -   Add: `VITE_API_URL=http://localhost:5000` (or your backend URL).

### Development

Start the development server:
```bash
npm run dev
```
The app will run at `http://localhost:5173` (by default).

### Production Build

To build the application for production:
```bash
npm run build
```
This generates a `dist` folder. You can preview it locally using:
```bash
npm run preview
```

---

##  Project Architecture

We follow a **Feature-Sliced** inspired architecture to keep the codebase scalable.

```
client/src/
├── api/             # Centralized API layer (Axios services)
├── components/      # Shared/Generic UI components (Buttons, Inputs)
├── contexts/        # Global State (Auth, Theme)
├── features/        # Business Logic & Scoped Components
│   ├── admin/       # Modules specific to Admin role
│   ├── employee/    # Modules specific to Employee role
│   ├── platform/    # Modules specific to Platform Owner
│   └── super_admin/ # Modules specific to Super Admin
├── hooks/           # Shared Custom Hooks
├── pages/           # Route Views (Thin wrappers around features)
├── routes/          # Router Configuration & Guards
├── utils/           # Helper functions (Token management, Formatting)
└── main.jsx         # Application Entry Point
```

##  Tech Stack

-   **Core**: React 19, Vite
-   **Styling**: Tailwind CSS v4, Lucide React (Icons)
-   **State**: Context API (Global), Local State (Features)
-   **Routing**: React Router v7
-   **HTTP**: Axios
-   **Utils**: i18next (Localization), Day.js/FullCalendar

##  Authentication

Authentication is fully centralized:
-   **`api/services/authService.js`**: Handles all auth API calls.
-   **`utils/tokenUtils.js`**: Manages secure storage of JWT tokens.
-   **`AuthContext.jsx`**: Provides user state and auth methods to the app.

