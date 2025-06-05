# detailing-app

This project provides a small service module for managing detailing services stored in Google Firestore. The `src/services` directory contains components used by other modules to fetch available services or retrieve a service by ID.

## Usage

Install dependencies and compile TypeScript:

```bash
npm install
npm run build
```

Example of fetching services:

```ts
import { fetchServices, getServiceById } from './dist/services';

async function main() {
  const services = await fetchServices();
  console.log(services);

  const single = await getServiceById('some-id');
  console.log(single);
}
```

Ensure that Firebase credentials are configured via `GOOGLE_APPLICATION_CREDENTIALS` or other environment specific setup.
