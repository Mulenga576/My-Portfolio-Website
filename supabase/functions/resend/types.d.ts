// Type definitions for Supabase Edge Functions
declare global {
  namespace Deno {
    export const env: {
      get(key: string): string | undefined;
    };
    export function serve(handler: (request: Request) => Response | Promise<Response>): void;
  }
}

export {};
