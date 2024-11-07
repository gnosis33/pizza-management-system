import { setupWorker } from 'msw/browser'; // Import the worker function from the browser module
import { handlers } from './handlers'; // Import the handlers from the handlers module

export const worker = setupWorker(...handlers); // Create the worker using the setupWorker function and the handlers
