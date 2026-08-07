declare module "next/navigation" {
  export type AppRouterInstance = {
    back(): void;
    forward(): void;
    refresh(): void;
    push(href: string, options?: { scroll?: boolean }): void;
    replace(href: string, options?: { scroll?: boolean }): void;
    prefetch(href: string): void;
  };
  export function useRouter(): AppRouterInstance;
  export function usePathname(): string;
  export function useSearchParams(): {
    get(key: string): string | null;
    getAll(key: string): string[];
    has(key: string): boolean;
    toString(): string;
  };
  export function useParams<T extends Record<string, string | string[] | undefined> = Record<string, string | string[] | undefined>>(): T;
  export function redirect(url: string): never;
  export function notFound(): never;
  export function permanentRedirect(url: string): never;
}
