# Detailing App

This repository contains simple React components that use Firebase Firestore to manage detailing clients.

## Components

- `src/clients/AddClient.js` – form for creating a new client.
- `src/clients/ClientsList.js` – lists existing clients and allows deleting them.

Firestore collection `clients` stores documents with the following fields:

- `name`
- `phone`
- `car`
- `registration`
- `visitDate`
- `services`

## Setup

1. Install dependencies:
   ```bash
   npm install react firebase
   ```
2. Configure Firebase credentials in environment variables:
   - `REACT_APP_FIREBASE_API_KEY`
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`
   - `REACT_APP_FIREBASE_PROJECT_ID`
3. Import the components in your React application:
   ```jsx
   import AddClient from './clients/AddClient';
   import ClientsList from './clients/ClientsList';
   ```
4. Render them where needed:
   ```jsx
   <AddClient />
   <ClientsList />
   ```

The components will perform CRUD operations on the Firestore `clients` collection.
