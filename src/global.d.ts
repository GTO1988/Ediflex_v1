declare module '*.css'
declare module 'react' {
  export const StrictMode: any
  export const useEffect: any
  export const useMemo: any
  export const useState: any
  export type ReactNode = any
}
declare module 'react-dom/client' {
  export const createRoot: any
}
declare module 'react/jsx-runtime' {
  export const jsx: any
  export const jsxs: any
  export const Fragment: any
}
declare namespace JSX {
  interface IntrinsicElements { [elemName: string]: any }
  interface IntrinsicAttributes { key?: any }
}
