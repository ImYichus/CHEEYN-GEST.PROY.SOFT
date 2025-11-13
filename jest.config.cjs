/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  //Le dice a Jest que use ts-jest para transformar archivos .ts
  preset: 'ts-jest', 
  
  //Especifica el entorno en el que se ejecutarán las pruebas (Node.js)
  testEnvironment: 'node', 
  
  //Rutas donde Jest debe buscar los archivos de prueba
  testMatch: [
    '**/__tests__/**/*.test.ts', 
  ],
  
  //Mapea los alias si los usas (ej: @/lib/prisma a ./lib/prisma)
  moduleNameMapper: {
    //Si usas paths en tu tsconfig.json, necesitarás esto:
    //'^@/(.*)$': '<rootDir>/$1',
  },
  
  //Ignora node_modules para la transpilación
  transformIgnorePatterns: [
    '/node_modules/',
  ],
};