// mocks/browser
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// if (typeof window !== 'undefined') {
//   // Start the MSW worker in the browser
//   worker.start();
// }
