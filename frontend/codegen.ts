import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
   schema: 'http://localhost:4000/',
   documents: ['src/**/*.tsx'],
   ignoreNoDocuments: true,
   generates: {
      './src/graphql/': {
        preset: 'client',
        presetConfig: {
            persistedDocuments: true
        }
      }
   }
}
export default config