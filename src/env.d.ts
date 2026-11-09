/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // Adicione outras variáveis de ambiente aqui se precisar no futuro
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}