Este es un proyecto de [Next.js](https://nextjs.org) creado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Características

### Página del Simulador (/simulator)

El simulador de ahorros permite a los usuarios calcular el crecimiento de sus ahorros a lo largo del tiempo basándose en depósitos iniciales y contribuciones mensuales.

#### Fórmula de Cálculo

El simulador utiliza un cálculo de interés compuesto con la siguiente metodología:

**Tasa de Interés Mensual:** 0.5% (6% tasa anual efectiva)

**Algoritmo:**

```
Para cada mes i desde 1 hasta n:
  1. Calcular el interés mensual sobre el saldo actual
     interésMensual = saldoActual × 0.005

  2. Agregar el interés al total estimado
     interésEstimado += interésMensual

  3. Agregar la contribución mensual al total invertido
     saldoActual += contribuciónMensual
     totalInvertido += contribuciónMensual

  4. Actualizar el saldo con el interés ganado
     saldoActual += interésMensual

Monto Final = saldoActual
```

Donde:

- `saldoActual` comienza con el monto inicial
- El interés se calcula mensualmente sobre el saldo actual
- Las contribuciones mensuales se agregan al final de cada mes
- El interés se compone mensualmente

**Ejemplo:**

- Monto Inicial: $100,000 COP
- Contribución Mensual: $50,000 COP
- Meses: 12

Cálculo:

- Total Invertido: $700,000 COP ($100,000 + 12 × $50,000)
- Interés Estimado: ~$14,450 COP
- Monto Final: ~$714,450 COP

#### Reglas de Validación

El simulador implementa las siguientes reglas de validación:

1. **Monto Inicial**
   - Mínimo: $10,000 COP
   - Máximo: $30,000,000 COP
   - Formato: Peso Colombiano (COP) con formateo automático de moneda
   - Mensajes de error:
     - Campo vacío: "El monto inicial es requerido"
     - Debajo del mínimo: "El monto inicial debe ser al menos $10,000 COP"
     - Encima del máximo: "El monto inicial no puede ser superior a $30,000,000 COP"

2. **Contribución Mensual**
   - Mínimo: $10,000 COP
   - Máximo: $5,000,000 COP
   - Formato: Peso Colombiano (COP) con formateo automático de moneda
   - Mensajes de error:
     - Campo vacío: "El aporte mensual es requerido"
     - Debajo del mínimo: "El aporte mensual debe ser al menos $10,000 COP"
     - Encima del máximo: "El aporte mensual no puede ser superior a $5,000,000 COP"

3. **Número de Meses**
   - Mínimo: 5 meses
   - Máximo: 120 meses (10 años)
   - Tipo: Entero
   - Mensajes de error:
     - Campo vacío: "El número de meses es requerido"
     - Debajo del mínimo: "El plazo debe ser de al menos 5 meses"
     - Encima del máximo: "El plazo no puede ser superior a 120 meses (10 años)"

Todas las validaciones ocurren:
- En tiempo real mientras el usuario escribe (onChange) para feedback inmediato
- Al enviar el formulario (onSubmit) como validación final
- Los errores se muestran de forma amigable debajo de cada campo inválido

#### Funcionalidades

- Formateo de moneda en tiempo real para COP (Peso Colombiano)
- Validación en tiempo real mientras el usuario escribe (onChange) con mensajes de error descriptivos
- Botón de cálculo deshabilitado hasta que todos los campos sean válidos
- Límites establecidos:
  - Monto inicial: $10,000 - $30,000,000 COP
  - Aporte mensual: $10,000 - $5,000,000 COP
  - Plazo: 5 - 120 meses (máximo 10 años)
- Diseño responsivo que coincide con el estilo visual de la aplicación
- Visualización clara de resultados mostrando:
    - Total Invertido
    - Interés Estimado Ganado (resaltado en verde)
    - Monto Final
- Funcionalidad de reinicio para limpiar el formulario
- Notas informativas sobre la metodología de cálculo

## Primeros Pasos

Primero, ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

Puedes comenzar a editar la página modificando `app/page.tsx`. La página se actualiza automáticamente mientras editas el archivo.

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar automáticamente [Geist](https://vercel.com/font), una nueva familia de fuentes de Vercel.

## Más Información

Para aprender más sobre Next.js, consulta los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs) - aprende sobre las características y API de Next.js.
- [Aprende Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.

Puedes revisar [el repositorio de GitHub de Next.js](https://github.com/vercel/next.js) - ¡tus comentarios y contribuciones son bienvenidos!

## Desplegar en Vercel

La forma más fácil de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta nuestra [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
