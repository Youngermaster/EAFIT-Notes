# GUÍA COMPLETA DE FÓRMULAS DE EXCEL - ANÁLISIS FINANCIERO SANNA

## 📋 TABLA DE CONTENIDOS

1. [Estructura del Excel](#estructura-del-excel)
2. [Hoja 1: Supuestos e Inputs](#hoja-1-supuestos-e-inputs)
3. [Hoja 2: Proyecciones Financieras](#hoja-2-proyecciones-financieras)
4. [Hoja 3: Flujo de Caja Libre](#hoja-3-flujo-de-caja-libre)
5. [Hoja 4: Tabla de Amortización](#hoja-4-tabla-de-amortización)
6. [Hoja 5: FCL Inversionista](#hoja-5-fcl-inversionista)
7. [Hoja 6: Análisis de Sensibilidad](#hoja-6-análisis-de-sensibilidad)
8. [Hoja 7: Ratios Financieros](#hoja-7-ratios-financieros)
9. [Hoja 8: Análisis de Riesgo](#hoja-8-análisis-de-riesgo)
10. [Hoja 9: RBC y BAUE](#hoja-9-rbc-y-baue)
11. [Hoja 10: Comparación Escenarios](#hoja-10-comparación-escenarios)
12. [Hoja 11: Dashboard Ejecutivo](#hoja-11-dashboard-ejecutivo)

---

## ESTRUCTURA DEL EXCEL

El Excel está organizado en 11 hojas que siguen una lógica secuencial:

1. **Dashboard Ejecutivo** → Resumen visual para decisores
2. **Supuestos e Inputs** → Parámetros base del proyecto
3. **Proyecciones** → Estados financieros proyectados
4. **Flujo de Caja Libre** → FCL del proyecto
5. **Tabla Amortización** → Servicio de la deuda
6. **FCL Inversionista** → Flujo desde perspectiva del inversionista
7. **Sensibilidad** → Análisis de variables críticas
8. **Ratios Financieros** → Indicadores de desempeño
9. **Análisis de Riesgo** → Medición de incertidumbre
10. **RBC y BAUE** → Indicadores complementarios
11. **Escenarios Financiamiento** → Comparación de estructuras de capital

---

## HOJA 1: SUPUESTOS E INPUTS

### 1.1 PARÁMETROS MACROECONÓMICOS

**Celda C8: IPC promedio**
```excel
=0.064383
```
Valor histórico promedio DANE 2019-2024. Usar para actualizar precios.

**Celda C9: IPP promedio**
```excel
=0.07
```
Valor histórico promedio DANE 2019-2024. Usar para actualizar costos.

**Celda C10: Tasa libre de riesgo (Rf)**
```excel
=0.11393
```
Tasa TES Colombia a 10 años. Actualizar desde: https://www.investing.com/rates-bonds/colombia-10-year-bond-yield

**Celda C11: Prima riesgo mercado (ERP)**
```excel
=0.08
```
Prima riesgo accionario. Fuente: Damodaran (actualizar anualmente desde http://pages.stern.nyu.edu/~adamodar/)

**Celda C12: Prima riesgo país (CRP)**
```excel
=0.03
```
Spread EMBI+ Colombia. Actualizar desde JP Morgan.

**Celda C13: Tasa impositiva**
```excel
=0.35
```
35% según ley tributaria colombiana 2025.

---

### 1.2 PROYECCIÓN DE DEMANDA

**Celda C18: Usuarios totales Año 1**
```excel
=6460
```
Dato del estudio de mercado (encuestas EAFIT).

**Celda C19: Tasa conversión freemium**
```excel
=0.515
```
⚠️ **CRÍTICO**: Este es el supuesto MÁS importante. Validar con piloto.

**Celda C20: Usuarios premium Año 1**
```excel
=C18*C19
```
Formula: `=6460*0.515` = 3,327 usuarios premium

**Celda C21: Precio mensual premium**
```excel
=50000
```
Precio base según análisis de mercado.

**Celda C22: Precio anual promedio Año 1**
```excel
=C21*12
```
Formula: `=50000*12` = 600,000 COP/año por usuario

---

### 1.3 ESTRUCTURA DE INVERSIÓN

**Celda C26: Equipos de planta y oficina**
```excel
=86800000
```
Detalle: Computadores, servidores, mobiliario. Ver documento Word del proyecto.

**Celda E26: Valor residual equipos (10%)**
```excel
=C26*0.10
```
Formula: `=86800000*0.10` = 8,680,000 COP

**Celda C27: Adecuaciones y gastos legales**
```excel
=26300000
```
Gastos de constitución, licencias, adecuaciones.

**Celda C28: Capital de trabajo**
```excel
=17839168.935
```
Capital para operación inicial. Ver cálculo en documento Word.

**Celda C30: TOTAL INVERSIÓN**
```excel
=SUM(C26:C29)
```
Formula: `=SUM(86800000,26300000,17839168.935,0)` = 130,939,168.935 COP

---

### 1.4 ESTRUCTURA DE FINANCIAMIENTO

**Celda C33: Monto deuda**
```excel
=C30*D33
```
Formula: `=130939168.935*0.60` = 78,563,501.361 COP

**Celda C34: Monto patrimonio**
```excel
=C30*D34
```
Formula: `=130939168.935*0.40` = 52,375,667.574 COP

**Celda C35: Total fuentes**
```excel
=C33+C34
```
Verificación: Debe ser igual a C30.

**Celda C38: Tasa crédito nominal (EA)**
```excel
=0.25
```
25% EA según tasas Bancolombia para empresas tecnológicas.

**Celda C39: Plazo**
```excel
=5
```
5 años según documento del proyecto.

---

### 1.5 CÁLCULO DEL COSTO DE CAPITAL (WACC)

**Celda C45: Beta no apalancada (βU)**
```excel
=1.50
```
Sector Healthtech. Fuente: Damodaran. NOTA: Documento original usa 1.1 (demasiado bajo).

**Celda C46: Relación D/E**
```excel
=D33/D34
```
Formula: `=0.60/0.40` = 1.50

**Celda C47: Beta apalancada (βL)**
```excel
=C45*(1+(1-C13)*C46)
```
Formula Hamada: `=1.50*(1+(1-0.35)*1.50)` = 2.9625

**Celda C48: Ke (CAPM)**
```excel
=C10+C47*C11+C12
```
Formula CAPM: `=Rf+βL*ERP+CRP`
= `=0.11393+2.9625*0.08+0.03` = 38.09%

**Celda C49: Kd (pre-impuesto)**
```excel
=C38
```
= 0.25 (25%)

**Celda C50: Kd (post-impuesto)**
```excel
=C49*(1-C13)
```
Formula: `=0.25*(1-0.35)` = 0.1625 (16.25%)

**Celda C52: WACC**
```excel
=D34*C48+D33*C50
```
Formula: `=We*Ke+Wd*Kd_post`
= `=0.40*0.3809+0.60*0.1625` = 24.99%

📌 **NOTA**: El documento original usa TIO=30% en lugar de CAPM, resultando en WACC=21.75%. Ambos son válidos, pero CAPM es más técnico.

---

### 1.6 COSTOS Y GASTOS UNITARIOS

**Celda C56: Costo producción unitario Año 1**
```excel
=106104.75
```
Del documento Word. Incluye: desarrolladores, licencias software, infraestructura cloud.

**Celda C57: Gasto admin y venta unitario Año 1**
```excel
=77185.743056
```
Del documento Word. Incluye: gerencia, RRHH, marketing, arrendamiento.

**Celda C58: Total costo+gasto unitario**
```excel
=C56+C57
```
Formula: `=106104.75+77185.743056` = 183,290.49 COP por usuario premium

---

## HOJA 2: PROYECCIONES FINANCIERAS

### 2.1 INGRESOS

**Celda C7: Usuarios premium Año 1**
```excel
=Supuestos!C20
```
Referencia a usuarios calculados en supuestos.

**Celda D7: Usuarios premium Año 2**
```excel
=C7*(1+Supuestos!$C$18*Supuestos!$C$9)
```
Crecimiento basado en: Crecimiento usuarios (6.4%) + ajuste IPP
Formula: `=3327*(1+0.064)` = 3,540 usuarios

**Celda E7-G7: Años 3-5**
```excel
Copiar fórmula D7 y arrastrar (crecimiento compuesto)
```

**Celda C8: Precio promedio anual Año 1**
```excel
=Supuestos!C22
```
= 600,000 COP

**Celda D8: Precio promedio Año 2**
```excel
=C8*(1+Supuestos!$C$8)
```
Actualización por IPC: `=600000*(1+0.064383)` = 638,630 COP

**Celda E8-G8: Años 3-5**
```excel
Copiar fórmula D8 y arrastrar
```

**Celda C9: Ingresos operacionales Año 1**
```excel
=C7*C8
```
Formula: `=3327*600000` = 1,996,200,000 COP

**Celda D9-G9: Años 2-5**
```excel
=D7*D8  (y así sucesivamente)
```

**Celda C11: TOTAL INGRESOS Año 1**
```excel
=C9+C10
```
Como no hay ingresos no operacionales: `=C9+0` = C9

---

### 2.2 EGRESOS

**Celda C14: Usuarios premium (repetido para claridad)**
```excel
=C7
```

**Celda C15: Costo unitario producción Año 1**
```excel
=Supuestos!C56
```
= 106,104.75 COP

**Celda D15: Costo unitario Año 2**
```excel
=C15*(1+Supuestos!$C$9)
```
Actualización por IPP: `=106104.75*(1+0.07)` = 113,532.08 COP

**Celda C16: Gasto unitario admin y venta Año 1**
```excel
=Supuestos!C57
```
= 77,185.74 COP

**Celda D16: Gasto unitario Año 2**
```excel
=C16*(1+Supuestos!$C$9)
```
Actualización por IPP: `=77185.74*(1+0.07)` = 82,588.74 COP

**Celda C17: Costos de producción Año 1**
```excel
=C14*C15
```
Formula: `=3327*106104.75` = 353,006,503 COP

**Celda C18: Gastos admin y venta Año 1**
```excel
=C14*C16
```
Formula: `=3327*77185.74` = 256,728,668 COP

**Celda C19: Depreciación equipos**
```excel
=Supuestos!C26/10
```
Vida útil 10 años: `=86800000/10` = 8,680,000 COP/año

**Celda C20: Amortización diferidos**
```excel
=Supuestos!C27/5
```
Vida útil 5 años: `=26300000/5` = 5,260,000 COP/año

**Celda C21: TOTAL EGRESOS Año 1**
```excel
=SUM(C17:C20)
```
Formula: `=353006503+256728668+8680000+5260000` = 623,675,171 COP

---

### 2.3 UTILIDADES

**Celda C24: UTILIDAD BRUTA Año 1**
```excel
=C11-C21
```
Formula: `=Ingresos-Egresos` = 1,996,200,000 - 623,675,171 = 1,372,524,829 COP

**Celda C25: Intereses crédito Año 1**
```excel
=0
```
⚠️ IMPORTANTE: Los intereses NO van en el flujo del proyecto, van en el flujo del inversionista.

**Celda C26: UTILIDAD ANTES IMPUESTOS Año 1**
```excel
=C24-C25
```
Como no hay intereses en FCL proyecto: `=C24-0` = C24

**Celda C27: Impuestos (35%) Año 1**
```excel
=C26*Supuestos!$C$13
```
Formula: `=1372524829*0.35` = 480,383,690 COP

**Celda C28: UTILIDAD NETA Año 1**
```excel
=C26-C27
```
Formula: `=1372524829-480383690` = 892,141,139 COP

---

## HOJA 3: FLUJO DE CAJA LIBRE

### 3.1 CONSTRUCCIÓN DEL FCL

**Celda C6: Utilidad neta Año 0**
```excel
=0
```
No hay utilidad en año 0 (inversión inicial).

**Celda D6: Utilidad neta Año 1**
```excel
=Proy!C28
```
Referencia a Utilidad Neta calculada en Proyecciones.

**Celda D7: Depreciación Año 1**
```excel
=8680000
```
Se SUMA porque no es salida de efectivo.

**Celda D8: Amortización Año 1**
```excel
=5260000
```
Se SUMA porque no es salida de efectivo.

**Celda D9: Valor residual equipos Años 1-4**
```excel
=0
```
Solo se recupera en año 5.

**Celda H9: Valor residual equipos Año 5**
```excel
=Supuestos!E26
```
= 8,680,000 COP (10% del valor inicial).

**Celda D10: Recuperación capital trabajo Años 1-4**
```excel
=0
```
Solo se recupera al final del proyecto.

**Celda H10: Recuperación capital trabajo Año 5**
```excel
=Supuestos!C28
```
= 17,839,168.935 COP

**Celda C11: Inversión inicial Año 0**
```excel
=-Supuestos!C30
```
Signo negativo porque es salida de efectivo: = -130,939,168.935 COP

**Celda D11-H11: Inversión Años 1-5**
```excel
=0
```
La inversión solo ocurre en año 0.

**Celda C13: FLUJO CAJA LIBRE Año 0**
```excel
=SUM(C6:C11)
```
Formula: `=0+0+0+0+0-130939168.935` = -130,939,168.935 COP

**Celda D13: FCL Año 1**
```excel
=SUM(D6:D11)
```
Formula: `=UN+Deprec+Amort+VR+RecupKT-Inv`
= `=892141139+8680000+5260000+0+0-0` = 906,081,139 COP

📌 **NOTA**: Las cifras exactas pueden variar según los datos finales del documento Word. La estructura de fórmulas es lo importante.

---

### 3.2 INDICADORES FINANCIEROS DEL PROYECTO

**Celda D17: WACC**
```excel
=Supuestos!C52
```
Referencia al WACC calculado = 21.75% (o 24.99% si usas CAPM ajustado).

**Celda D18: VPN (Valor Presente Neto)**
```excel
=NPV(D17,D13:H13)+C13
```
📌 **FUNCIÓN NPV**: Calcula el valor presente de flujos FUTUROS.
- `D17` = Tasa de descuento (WACC)
- `D13:H13` = Flujos años 1 a 5
- `+C13` = Suma la inversión inicial (que ya está en valor presente)

Formula expandida:
```
VPN = -130,939,169 
      + FCL1/(1+WACC)^1 
      + FCL2/(1+WACC)^2 
      + FCL3/(1+WACC)^3 
      + FCL4/(1+WACC)^4 
      + FCL5/(1+WACC)^5
```

**Celda D19: TIR (Tasa Interna de Retorno)**
```excel
=IRR(C13:H13)
```
📌 **FUNCIÓN IRR**: Calcula la tasa que hace VPN = 0.
- `C13:H13` = Todos los flujos (incluyendo año 0)

**Celda D20: Margen TIR - WACC**
```excel
=D19-D17
```
Formula: `=TIR-WACC`. Si es positivo → Proyecto VIABLE.

**Celda D21: TIRM (TIR Modificada)**
```excel
=MIRR(C13:H13,D17,D17)
```
📌 **FUNCIÓN MIRR**: TIR modificada que asume reinversión a tasa específica.
- `C13:H13` = Flujos
- `D17` = Tasa de financiamiento (para valores negativos)
- `D17` = Tasa de reinversión (para valores positivos)

TIRM es más realista que TIR cuando hay flujos mixtos.

**Celda D23: BAUE (Beneficio Anual Uniforme Equivalente)**
```excel
=-PMT(D17,5,D18)
```
📌 **FUNCIÓN PMT**: Calcula pago periódico de un préstamo/inversión.
- Signo negativo porque queremos el beneficio (no el pago)
- `D17` = Tasa (WACC)
- `5` = Número de períodos
- `D18` = Valor presente (VPN)

Convierte el VPN en una anualidad equivalente.

**Celda D26: Decisión de Inversión**
```excel
=IF(D18>0,"VIABLE","NO VIABLE")
```
📌 **FUNCIÓN IF**: Si VPN > 0, proyecto es viable.

---

## HOJA 4: TABLA DE AMORTIZACIÓN

### 4.1 DATOS DEL CRÉDITO

**Celda C5: Monto del crédito**
```excel
=Supuestos!C33
```
= 78,563,501.361 COP

**Celda C6: Tasa de interés**
```excel
=Supuestos!C38
```
= 0.25 (25% EA)

**Celda C7: Plazo**
```excel
=Supuestos!C39
```
= 5 años

**Celda C10: Cuota anual**
```excel
=PMT(C6,C7,C5)
```
📌 **FUNCIÓN PMT**: Calcula cuota fija de un préstamo.
- `C6` = Tasa de interés (25%)
- `C7` = Número de períodos (5)
- `C5` = Valor presente del préstamo (monto)

Resultado: 29,213,581.84 COP/año

**NOTA IMPORTANTE sobre PMT:**
- PMT devuelve valor NEGATIVO (representa pago saliente)
- Para usarlo en amortización, puedes dejarlo negativo o usar =ABS(PMT(...))
- En esta tabla lo usamos como referencia positiva: `=$C$10`

---

### 4.2 TABLA DE AMORTIZACIÓN (Años 1-5)

**FILA 14 - AÑO 1:**

**Celda B14: Año**
```excel
=1
```

**Celda C14: Saldo Inicial Año 1**
```excel
=C5
```
Primera vez = Monto del crédito = 78,563,501.36 COP

**Celda D14: Interés Año 1**
```excel
=C14*$C$6
```
Formula: `=Saldo Inicial*Tasa`
= `=78563501.36*0.25` = 19,640,875.34 COP

**Celda E14: Abono Capital Año 1**
```excel
=$C$10-D14
```
Formula: `=Cuota-Interés`
= `=29213581.84-19640875.34` = 9,572,706.50 COP

**Celda F14: Cuota Año 1**
```excel
=$C$10
```
Referencia absoluta a la cuota calculada = 29,213,581.84 COP

**Celda G14: Saldo Final Año 1**
```excel
=C14-E14
```
Formula: `=Saldo Inicial-Abono Capital`
= `=78563501.36-9572706.50` = 68,990,794.86 COP

---

**FILA 15 - AÑO 2:**

**Celda C15: Saldo Inicial Año 2**
```excel
=G14
```
Saldo inicial = Saldo final del año anterior = 68,990,794.86 COP

**Celda D15: Interés Año 2**
```excel
=C15*$C$6
```
= `=68990794.86*0.25` = 17,247,698.72 COP

**Celda E15: Abono Capital Año 2**
```excel
=$C$10-D15
```
= `=29213581.84-17247698.72` = 11,965,883.12 COP

**Celda F15: Cuota Año 2**
```excel
=$C$10
```
= 29,213,581.84 COP (cuota fija)

**Celda G15: Saldo Final Año 2**
```excel
=C15-E15
```
= `=68990794.86-11965883.12` = 57,024,911.74 COP

---

**FILAS 16-18 (Años 3-5):**
Copiar las fórmulas de la Fila 15 y arrastrar hasta el año 5.

**VERIFICACIÓN FINAL:**
- Saldo final Año 5 (G18) debe ser 0 o muy cercano a 0
- Si no es 0, hay error de redondeo o en la fórmula PMT

---

## HOJA 5: FCL INVERSIONISTA

### 5.1 CONSTRUCCIÓN DEL FLUJO

**Celda C6: Utilidad neta Año 0**
```excel
=0
```

**Celda D6: Utilidad neta Año 1**
```excel
=Proy!C28
```
Misma utilidad que en FCL proyecto.

**Celda D7-D8: Depreciación y Amortización**
```excel
=8680000
=5260000
```
Se suman igual que en FCL proyecto.

**Celda D9-D10: Valor residual y Recuperación K trabajo**
```excel
Igual que en FCL proyecto (0 en años 1-4, valores en año 5)
```

**Celda C11: Desembolso crédito Año 0**
```excel
=Amort!C5
```
= 78,563,501.36 COP (POSITIVO porque es entrada de efectivo)

**Celda D11-H11: Desembolso crédito Años 1-5**
```excel
=0
```
Solo en año 0.

**Celda D12: Intereses crédito Año 1**
```excel
=Amort!D14
```
Referencia a la tabla de amortización = 19,640,875.34 COP
Se RESTA porque es salida de efectivo.

**Celda E12-H12: Intereses Años 2-5**
```excel
=Amort!D15  (Año 2)
=Amort!D16  (Año 3)
=Amort!D17  (Año 4)
=Amort!D18  (Año 5)
```

**Celda D13: Abono capital crédito Año 1**
```excel
=Amort!E14
```
= 9,572,706.50 COP (se RESTA porque es salida de efectivo)

**Celda E13-H13: Abono capital Años 2-5**
```excel
=Amort!E15  (Año 2)
=Amort!E16  (Año 3)
=Amort!E17  (Año 4)
=Amort!E18  (Año 5)
```

**Celda C14: Aporte inversionista Año 0**
```excel
=-Supuestos!C34
```
= -52,375,667.57 COP (NEGATIVO porque es salida de efectivo)

**Celda D14-H14: Aporte inversionista Años 1-5**
```excel
=0
```
Solo en año 0.

**Celda C16: FLUJO CAJA INVERSIONISTA Año 0**
```excel
=SUM(C6:C14)
```
Formula: `=0+0+0+0+0+78563501.36+0+0-52375667.57`
= 26,187,833.79 COP

📌 **IMPORTANTE**: En año 0, el inversionista recibe el crédito pero aporta su parte, resultando en flujo POSITIVO en algunos modelos o NEGATIVO en otros según convención. Aquí usamos:
- Flujo = +Crédito - Aporte propio = Flujo neto para el inversionista

**Celda D16: FCL Inversionista Año 1**
```excel
=SUM(D6:D14)
```
Formula: `=UN+Deprec+Amort+VR+RecupKT+Crédito-Intereses-AbonoK-Aporte`

---

### 5.2 INDICADORES DEL INVERSIONISTA

**Celda D19: TIO (Tasa de Oportunidad del Inversionista)**
```excel
=Supuestos!C40
```
= 0.30 (30% EA)

Esta es la tasa mínima que el inversionista espera ganar.

**Celda D20: VPN Inversionista**
```excel
=NPV(D19,D16:H16)+C16
```
📌 **FUNCIÓN NPV**: Igual que para proyecto, pero usa TIO en lugar de WACC.
- `D19` = TIO (30%)
- `D16:H16` = Flujos años 1 a 5
- `+C16` = Flujo año 0

**Celda D21: TIR Inversionista**
```excel
=IRR(C16:H16)
```
Rentabilidad real del inversionista considerando apalancamiento.

**Celda D22: Margen TIR - TIO**
```excel
=D21-D19
```
Si es positivo → Atractivo para el inversionista.

**Celda D23: TIRM Inversionista**
```excel
=MIRR(C16:H16,D19,D19)
```
TIR modificada para el inversionista.

**Celda D25: Decisión Inversionista**
```excel
=IF(D20>0,"VIABLE","NO VIABLE")
```
Si VPN inversionista > 0 → Invertir.

---

## HOJA 6: ANÁLISIS DE SENSIBILIDAD

### 6.1 SENSIBILIDAD UNIVARIABLE

Esta hoja requiere uso de **TABLAS DE DATOS** de Excel para calcular automáticamente múltiples escenarios.

#### 6.1.1 Sensibilidad al Precio

**CONFIGURACIÓN:**
1. En celda auxiliar (ej: B50): Escribe `=FCL!D18` (VPN base)
2. Crea tabla con variaciones de precio en columna A (−30%, −20%, −10%, 0%, +10%, +20%, +30%)
3. En columna B, celdas correspondientes: Referencias a VPN

**USAR TABLA DE DATOS:**
1. Selecciona rango completo (A6:B13)
2. Menú: Datos → Análisis Y Si → Tabla de datos
3. Celda de entrada (columna): Vincular a celda donde está el precio base (Supuestos!C21)
4. En cada celda de variación, multiplicar precio base: `=Supuestos!C21*(1+porcentaje)`

**FÓRMULAS ALTERNATIVAS (Manual):**

**Celda C7: VPN con Precio -30%**
```excel
Modificar temporalmente Supuestos!C21 a 35000 y recalcular
O usar BÚSQUEDA DE OBJETIVO
```

📌 **RECOMENDACIÓN**: Usar **Administrador de Escenarios** o **Tabla de Datos** en lugar de fórmulas manuales.

---

#### 6.1.2 Sensibilidad a Tasa de Conversión

**Celda D16: VPN con Conversión 5%**
```excel
Modificar Supuestos!C19 = 0.05 y observar cambio en FCL!D18
```

**Tabla automática:**
1. Crear columna con tasas: 5%, 10%, 20%, 30%, 40%, 51.5%, 60%, 70%
2. Usar Tabla de Datos vinculada a Supuestos!C19
3. Excel calculará VPN automáticamente para cada tasa

---

#### 6.1.3 Sensibilidad al WACC

**Celda C30: VPN con WACC 15%**
```excel
Modificar FCL!D17 = 0.15
Recalcular: =NPV(0.15,FCL!D13:FCL!H13)+FCL!C13
```

📌 **NOTA**: No puedes cambiar directamente el WACC calculado, debes usar una celda auxiliar o Tabla de Datos.

---

### 6.2 MATRIZ DE SENSIBILIDAD BIDIMENSIONAL

**Objetivo**: Analizar VPN variando SIMULTÁNEAMENTE Precio y Conversión.

**CONFIGURACIÓN:**
1. Fila superior: Variaciones de Precio (−20%, −10%, 0%, +10%, +20%)
2. Columna izquierda: Tasas de Conversión (10%, 20%, 30%, 40%, 51.5%, 60%)
3. Celda de referencia: `=FCL!D18`

**USAR TABLA DE DATOS BIDIMENSIONAL:**
1. Seleccionar toda la matriz (incluye fila y columna de variaciones + celda referencia)
2. Datos → Análisis Y Si → Tabla de datos
3. Celda de entrada (fila): Supuestos!C21 (Precio)
4. Celda de entrada (columna): Supuestos!C19 (Conversión)
5. Excel calcula automáticamente todas las combinaciones

**Interpretación:**
- Celdas VERDES → VPN > 50M (muy viable)
- Celdas AMARILLAS → VPN entre 0-50M (viable con reserva)
- Celdas ROJAS → VPN < 0 (no viable)

---

## HOJA 7: RATIOS FINANCIEROS

### 7.1 RATIOS DE RENTABILIDAD

**Celda D8: Margen Bruto Año 1**
```excel
=(Proy!C11-Proy!C17)/Proy!C11
```
Formula: `=(Ingresos-Costos Producción)/Ingresos`
Mide rentabilidad antes de gastos operativos.

**Celda D9: Margen Operativo Año 1**
```excel
=(Proy!C11-Proy!C21)/Proy!C11
```
Formula: `=(Ingresos-Total Egresos)/Ingresos`
Equivalente a EBIT Margin.

**Celda D10: Margen Neto Año 1**
```excel
=Proy!C28/Proy!C11
```
Formula: `=Utilidad Neta/Ingresos`
Rentabilidad final después de todos los gastos e impuestos.

**Celda D11: ROE Año 1**
```excel
=Proy!C28/(Supuestos!C34+(Proy!C28-Proy!C28*0.5))
```
Formula: `=Utilidad Neta/Patrimonio Promedio`

Patrimonio Promedio = (Patrimonio Inicial + Patrimonio Final)/2
Patrimonio Final = Patrimonio Inicial + Utilidad Retenida

📌 **SIMPLIFICACIÓN**: Si asumes 100% distribución de utilidades:
```excel
=Proy!C28/Supuestos!C34
```

**Celda D12: ROA Año 1**
```excel
=Proy!C28/(Supuestos!C30+(Supuestos!C30-Amort!G14))
```
Formula: `=Utilidad Neta/Activos Promedio`

Activos Promedio = (Activos Inicial + Activos Final)/2
Activos Final = Activos Inicial - Depreciación Acumulada

---

### 7.2 RATIOS DE EFICIENCIA

**Celda D14: Costos/Ingresos Año 1**
```excel
=Proy!C17/Proy!C11
```
Debe tender a bajar por economías de escala.

**Celda D15: Gastos/Ingresos Año 1**
```excel
=Proy!C18/Proy!C11
```
Debe tender a bajar en startups maduras.

**Celda D16: EBITDA Año 1**
```excel
=Proy!C24+Proy!C19+Proy!C20
```
Formula: `=UAII + Depreciación + Amortización`
= `=Utilidad Bruta + Deprec + Amort`

📌 **EBITDA** = Earnings Before Interest, Taxes, Depreciation, and Amortization

**Celda D17: Margen EBITDA Año 1**
```excel
=D16/Proy!C11
```
Formula: `=EBITDA/Ingresos`

Benchmark SaaS: 20-40% es saludable.

---

### 7.3 MÉTRICAS ESPECÍFICAS (SaaS/Tech)

**Celda D20: ARPU (Average Revenue Per User) Año 1**
```excel
=Proy!C9/Proy!C7
```
Formula: `=Ingresos Totales/Número Usuarios Premium`
= Revenue per user al año.

**Celda E21: Crecimiento Usuarios Año 2 (%)**
```excel
=(Proy!D7-Proy!C7)/Proy!C7
```
Formula: `=(Usuarios Año 2 - Usuarios Año 1)/Usuarios Año 1`

**Celda E22: Crecimiento Ingresos Año 2 (%)**
```excel
=(Proy!D9-Proy!C9)/Proy!C9
```

**Celda D23: CAC (Customer Acquisition Cost)**
```excel
=Gasto_Marketing_Anual/Nuevos_Usuarios
```
⚠️ Requiere datos adicionales no en el modelo actual.

Ejemplo:
- Si Gastos Marketing = 50M/año
- Nuevos usuarios = 3,327
- CAC = 50,000,000/3,327 = 15,029 COP

**Celda D24: LTV (Lifetime Value)**
```excel
=ARPU*Vida_Promedio*Margen_Neto
```
Ejemplo:
- ARPU = 600,000/año
- Vida promedio = 3 años
- Margen = 45%
- LTV = 600,000 × 3 × 0.45 = 810,000 COP

**Celda D25: Ratio LTV/CAC**
```excel
=D24/D23
```
📌 **BENCHMARK**:
- LTV/CAC > 3 → Excelente
- LTV/CAC 2-3 → Bueno
- LTV/CAC < 2 → Problema

---

## HOJA 8: ANÁLISIS DE RIESGO

### 8.1 DISTRIBUCIÓN BETA

**Celda C7: VPN del Proyecto (X)**
```excel
=FCL!D18
```
Valor a analizar para probabilidad de ocurrencia.

**Celda C8: Parámetro Alfa (α)**
```excel
=1.5
```
Sesgo hacia escenario optimista. Valores típicos: 1-3.

**Celda C9: Parámetro Beta (β)**
```excel
=3.0
```
Sesgo hacia escenario pesimista. α < β = distribución conservadora.

**Celda C10: Escenario Pesimista (A)**
```excel
=C7*0.75
```
VPN con variación de -25%. Ajustar según análisis de sensibilidad.

**Celda C11: Escenario Optimista (B)**
```excel
=C7*1.25
```
VPN con variación de +25%.

**Celda C14: Probabilidad de Éxito**
```excel
=BETA.DIST((C7-C10)/(C11-C10),C8,C9,TRUE)
```
📌 **FUNCIÓN BETA.DIST**: Distribución Beta acumulada.

Parámetros:
- `(C7-C10)/(C11-C10)` = Normaliza X al rango [0,1]
- `C8` = α (forma1)
- `C9` = β (forma2)
- `TRUE` = Función acumulada (probabilidad de que X ≤ valor)

**Interpretación:**
- 0.78 (78%) = Alta probabilidad de alcanzar o superar VPN
- >0.70 = Proyecto con buen pronóstico
- <0.50 = Proyecto riesgoso

**Celda C15: Riesgo Financiero**
```excel
=1-C14
```
Probabilidad de NO alcanzar el VPN proyectado.

---

### 8.2 PUNTO DE EQUILIBRIO

**Celda D19: Precio promedio**
```excel
=Proy!C8
```
= 600,000 COP/usuario/año

**Celda D20: Costo variable unitario**
```excel
=Proy!C15+Proy!C16
```
= Costo producción + Gasto admin = 183,290 COP

**Celda D21: Costos fijos totales**
```excel
=Proy!C19+Proy!C20
```
= Depreciación + Amortización = 13,940,000 COP

**Celda D23: Usuarios en Equilibrio (Qe)**
```excel
=D21/(D19-D20)
```
Formula: `Qe = CF/(P-CVu)`
= `13,940,000/(600,000-183,290)` = 33.45 ≈ **34 usuarios premium**

**Interpretación:** Con solo 34 usuarios premium, se cubren los costos fijos. Como se proyectan 3,327 usuarios, hay amplio margen de seguridad.

**Celda D24: Ingresos en Equilibrio**
```excel
=D23*D19
```
= 34 × 600,000 = 20,070,000 COP

---

### 8.3 PERÍODO DE RECUPERACIÓN (PRI)

**Celda C32: Año 0 - Flujo**
```excel
=FCL!C13
```
= -130,939,169 COP

**Celda D32: Año 0 - Flujo Acumulado**
```excel
=C32
```
= -130,939,169 COP

**Celda E32: Año 0 - Estado**
```excel
=IF(D32>0,"Recuperado","Pendiente")
```
= "Pendiente"

**Celda C33: Año 1 - Flujo**
```excel
=FCL!D13
```

**Celda D33: Año 1 - Flujo Acumulado**
```excel
=D32+C33
```
= Acumulado Año 0 + Flujo Año 1

**COPIAR FÓRMULAS** para años 2-5.

**Celda C39: Cálculo PRI**
```excel
=MATCH(TRUE,D32:D37>0,0)-1+(ABS(INDEX(D32:D37,MATCH(TRUE,D32:D37>0,0)-1))/INDEX(C32:C37,MATCH(TRUE,D32:D37>0,0)))
```
📌 **FUNCIÓN MATCH**: Encuentra el primer año donde acumulado > 0.
📌 **FUNCIÓN INDEX**: Extrae valores de la tabla.

**Formula simplificada para PRI:**
Si acumulado se vuelve positivo en Año 4:
```
PRI = 3 + ABS(Acumulado_Año3)/Flujo_Año4
```

---

### 8.4 ESCENARIOS DE ESTRÉS

Usar **Administrador de Escenarios** de Excel:
1. Datos → Análisis Y Si → Administrador de escenarios
2. Crear 3 escenarios: Pesimista, Base, Optimista
3. Definir celdas cambiantes: Supuestos!C19 (Conversión), Supuestos!C21 (Precio), Costos
4. Excel genera tabla resumen automáticamente

---

## HOJA 9: RBC Y BAUE

### 9.1 RELACIÓN BENEFICIO-COSTO

**Celda D8: Valor Presente Ingresos (VPI)**
```excel
=NPV(Supuestos!C52,Proy!C9:Proy!G9)
```
📌 **IMPORTANTE**: NO sumar inversión inicial, solo flujos de ingresos.

Formula: `VPI = Σ[Ingresos_t / (1+WACC)^t]`

**Celda D9: Valor Presente Egresos (VPE)**
```excel
=NPV(Supuestos!C52,Proy!C21:Proy!G21)+Supuestos!C30
```
Formula: `VPE = Inversión Inicial + Σ[Egresos_t / (1+WACC)^t]`

**Celda D11: RBC**
```excel
=D8/D9
```
Formula: `RBC = VPI/VPE`

**Interpretación:**
- RBC > 1 → Por cada peso invertido se genera más de 1 peso de beneficio → VIABLE
- RBC = 1 → Punto de equilibrio
- RBC < 1 → Se pierde dinero → NO VIABLE

**Ejemplo:**
Si VPI = 1,800M y VPE = 1,400M:
RBC = 1,800/1,400 = 1.29

Por cada $1 invertido, se generan $1.29 de beneficio → Rentabilidad del 29%.

---

### 9.2 BAUE

**Celda D22: VPN**
```excel
=FCL!D18
```

**Celda D23: WACC**
```excel
=Supuestos!C52
```

**Celda D24: Horizonte (n)**
```excel
=5
```

**Celda D26: BAUE**
```excel
=-PMT(D23,D24,D22)
```
📌 **FUNCIÓN PMT**: Convierte VPN en anualidad equivalente.

Formula: `BAUE = VPN × [i(1+i)^n] / [(1+i)^n - 1]`

**Interpretación:**
Si VPN = 57,467,798 y WACC = 21.75%:
```
BAUE = -PMT(0.2175,5,57467798)
BAUE ≈ 18,800,000 COP/año
```

Significa que el proyecto genera un beneficio EQUIVALENTE a recibir 18.8M cada año durante 5 años.

**Utilidad del BAUE:**
- Comparar proyectos con diferentes horizontes temporales
- Evaluar si conviene extender o acortar la vida del proyecto
- Decisión de reemplazo de activos

---

## HOJA 10: COMPARACIÓN ESCENARIOS FINANCIAMIENTO

### 10.1 ESCENARIO 1: SIN DEUDA (100% Capital)

**Celda C9: Deuda**
```excel
=0
```

**Celda C10: Patrimonio**
```excel
=Supuestos!C30
```
= 130,939,169 COP (100% capital propio)

**Celda C14: Ke**
```excel
=Supuestos!C48
```
Sin apalancamiento, usar βU (no apalancada):
```
Ke = Rf + βU × ERP + CRP
Ke = 11.393% + 1.50 × 8% + 3% = 26.39%
```

**Celda C15: Kd post**
```excel
=0
```
No hay deuda.

**Celda C16: WACC**
```excel
=C14
```
WACC = Ke (todo es capital propio) = 26.39%

**Celda C19: VPN con WACC 26.39%**
```excel
=NPV(C16,FCL!D13:FCL!H13)+FCL!C13
```
Recalcular VPN usando este WACC.

**Celda C20: TIR**
```excel
=FCL!D19
```
TIR del proyecto no cambia (es independiente del financiamiento).

**Celda C21: VPN Inversionista**
```excel
VPN = VPN del proyecto (todo va para el inversionista)
```

**Celda C22: TIR Inversionista**
```excel
=TIR del proyecto (sin efecto leverage)
```

---

### 10.2 ESCENARIO 2: ACTUAL (60% Deuda)

Ya calculado en hojas anteriores. Solo referenciar:
```excel
C9: =Supuestos!C33
C10: =Supuestos!C34
C16: =Supuestos!C52
C19: =FCL!D18
C20: =FCL!D19
C21: =FCLInv!D20
C22: =FCLInv!D21
```

---

### 10.3 ESCENARIO 3: ALTA DEUDA (80% Deuda)

**Celda E9: Deuda**
```excel
=Supuestos!C30*0.80
```
= 104,751,335 COP

**Celda E10: Patrimonio**
```excel
=Supuestos!C30*0.20
```
= 26,187,834 COP

**Celda E14: Ke ajustado**
Necesitas recalcular βL con D/E = 80%/20% = 4.0:
```
βL = βU × [1+(1-T)×D/E]
βL = 1.50 × [1+0.65×4.0] = 5.40

Ke = Rf + βL × ERP + CRP
Ke = 11.393% + 5.40 × 8% + 3% = 57.59%
```
```excel
=0.5759
```

**Celda E15: Kd post**
```excel
=Supuestos!C50
```
= 16.25% (mismo que antes)

**Celda E16: WACC**
```excel
=0.20*E14+0.80*E15
```
= `0.20×57.59% + 0.80×16.25%` = 24.52%

**Celda E19: VPN con WACC 24.52%**
```excel
=NPV(E16,FCL!D13:FCL!H13)+FCL!C13
```
Recalcular con nuevo WACC.

**Resto de indicadores:** Recalcular flujo inversionista con nueva estructura de deuda.

---

### 10.4 COMPARACIÓN Y DECISIÓN

**Celda F19: Mejor VPN**
```excel
=MAX(C19:E19)
```

**Celda F28: Conclusión**
```excel
=IF(F19=C19,"Sin Deuda",IF(F19=D19,"Actual 60%","Alta Deuda 80%"))
```

**Análisis cualitativo:**
- Sin deuda: Menor riesgo, menor retorno
- Deuda 60%: Balance riesgo-retorno, escudo fiscal
- Deuda 80%: Mayor retorno potencial, alto riesgo financiero

---

## HOJA 11: DASHBOARD EJECUTIVO

### 11.1 MÉTRICAS PRINCIPALES (Tarjetas)

**Celda C8: VPN Proyecto**
```excel
=FCL!D18
```
Formato condicional:
- Verde si > 50M
- Amarillo si 0-50M
- Rojo si < 0

**Celda E8: TIR Proyecto**
```excel
=FCL!D19
```
Formato: Porcentaje con 2 decimales.

**Celda G8: WACC**
```excel
=Supuestos!C52
```

**Celda I8: Margen TIR-WACC**
```excel
=FCL!D20
```
Formato condicional:
- Verde si > 10%
- Amarillo si 5-10%
- Rojo si < 5%

---

### 11.2 DECISIÓN DE INVERSIÓN

**Celda C14: Decisión Proyecto**
```excel
=FCL!D26
```
Muestra "VIABLE" o "NO VIABLE"

**Celda C15: Decisión Inversionista**
```excel
=FCLInv!D25
```

Formato condicional con ICONOS:
- ✅ si VIABLE
- ❌ si NO VIABLE

---

### 11.3 INDICADORES INVERSIONISTA

**Celdas H16-H19:** Referencias simples:
```excel
H16: =Supuestos!C40  (TIO)
H17: =FCLInv!D20     (VPN Inv)
H18: =FCLInv!D21     (TIR Inv)
H19: =FCLInv!D22     (Margen)
```

---

### 11.4 RESUMEN FINANCIERO AÑO 1

**Celdas C23-C28:**
```excel
C23: =Proy!C7        (Usuarios)
C24: =Proy!C9        (Ingresos)
C25: =Proy!C21       (Costos+Gastos)
C26: =Proy!C28       (Utilidad Neta)
C27: =Proy!C28/Proy!C9  (Margen Neto %)
C28: =FCL!D13        (FCL Año 1)
```

Formato condicional en C27:
- Verde si > 40%
- Amarillo si 30-40%
- Rojo si < 30%

---

### 11.5 INVERSIÓN Y FINANCIAMIENTO

**Celdas H31-H35:**
```excel
H31: =Supuestos!C30  (Inversión Total)
H32: =Supuestos!C33  (Deuda)
H33: =Supuestos!C34  (Patrimonio)
H34: =Supuestos!C38  (Tasa Crédito)
H35: =Supuestos!C39  (Plazo)
```

---

### 11.6 ALERTAS Y RIESGOS

Esta sección usa TEXTO ESTÁTICO pero se puede automatizar:

**Celda C40: Alerta Conversión**
```excel
=IF(Supuestos!C19<0.15,"🔴 CRÍTICO - Conversión muy baja",IF(Supuestos!C19<0.30,"🟡 IMPORTANTE - Validar conversión","🟢 POSITIVO - Conversión adecuada"))
```

**Celda C41: Alerta Costos**
```excel
=IF((Proy!D17/Proy!D11)>(Proy!C17/Proy!C11),"🟡 IMPORTANTE - Costos creciendo","🟢 POSITIVO - Costos controlados")
```

**Celda C42: Alerta TIR-WACC**
```excel
=IF((FCL!D19-Supuestos!C52)>0.15,"🟢 POSITIVO - Margen saludable",IF((FCL!D19-Supuestos!C52)>0.05,"🟡 ACEPTABLE - Margen justo","🔴 CRÍTICO - Margen insuficiente"))
```

---

## FÓRMULAS AVANZADAS Y TIPS

### 1. ADMINISTRADOR DE ESCENARIOS

**Ruta:** Datos → Análisis Y Si → Administrador de escenarios

**Uso:**
1. Definir celdas cambiantes (ej: Conversión, Precio, Costos)
2. Crear múltiples escenarios con diferentes valores
3. Generar informe resumen automático

**Ventaja:** Permite comparar hasta 32 escenarios simultáneamente sin modificar fórmulas.

---

### 2. BUSCAR OBJETIVO

**Ruta:** Datos → Análisis Y Si → Buscar objetivo

**Ejemplo: ¿Qué conversión necesito para VPN = 100M?**
```
Definir celda: FCL!D18 (VPN)
Con el valor: 100000000
Para cambiar celda: Supuestos!C19 (Conversión)
```

Excel calcula automáticamente la conversión necesaria.

---

### 3. TABLA DE DATOS (DATA TABLE)

**Tabla de 1 Variable:**
1. Crear columna con valores de entrada
2. En celda al lado, poner fórmula que depende de esa variable
3. Seleccionar ambas columnas
4. Datos → Análisis Y Si → Tabla de datos
5. Celda de entrada (columna): Variable a cambiar

**Tabla de 2 Variables:**
1. Variable 1 en fila superior
2. Variable 2 en columna izquierda
3. Fórmula en celda superior izquierda
4. Seleccionar toda la matriz
5. Datos → Análisis Y Si → Tabla de datos
6. Celda de entrada (fila): Variable 1
7. Celda de entrada (columna): Variable 2

---

### 4. SOLVER (Para Optimización)

**Instalación:** Archivo → Opciones → Complementos → Solver

**Ejemplo: Maximizar VPN cambiando múltiples variables con restricciones**
```
Objetivo: MAX(FCL!D18)
Cambiando: Precio, Conversión, Costos
Sujeto a:
  - Conversión entre 10% y 70%
  - Precio entre 30,000 y 80,000
  - VPN > 0
```

Solver encuentra la combinación óptima.

---

### 5. FORMATO CONDICIONAL CON FÓRMULAS

**Colorear celdas según valor:**
1. Seleccionar rango
2. Inicio → Formato condicional → Nueva regla
3. Usar fórmula para determinar formato

**Ejemplo: Resaltar flujos negativos**
```excel
=C13<0
```
Formato: Fondo rojo

**Ejemplo: Resaltar TIR > WACC**
```excel
=$D$19>$D$17
```
Formato: Fondo verde

---

### 6. VALIDACIÓN DE DATOS

**Crear listas desplegables:**
1. Seleccionar celda (ej: Tipo de amortización)
2. Datos → Validación de datos
3. Permitir: Lista
4. Origen: Cuota fija, Abono constante, Gradiente

**Ventaja:** Evita errores de entrada manual.

---

### 7. NOMBRES DEFINIDOS

**Crear nombres para celdas frecuentes:**
```
Fórmulas → Administrador de nombres → Nuevo
Nombre: WACC
Hace referencia a: =Supuestos!$C$52
```

**Uso en fórmulas:**
```excel
=NPV(WACC,FCL!D13:FCL!H13)+FCL!C13
```
Más legible que usar referencias de celda.

---

### 8. AUDITORÍA DE FÓRMULAS

**Rastrear precedentes:**
Fórmulas → Rastrear precedentes
Muestra flechas de qué celdas alimentan la fórmula.

**Rastrear dependientes:**
Fórmulas → Rastrear dependientes
Muestra qué celdas dependen de la celda actual.

**Evaluar fórmula:**
Fórmulas → Evaluar fórmula
Ejecuta la fórmula paso a paso (útil para debugging).

---

### 9. FUNCIONES FINANCIERAS ADICIONALES

**XNPV (VPN con fechas irregulares):**
```excel
=XNPV(tasa, flujos, fechas)
```
Útil si los flujos no son anuales exactos.

**XIRR (TIR con fechas irregulares):**
```excel
=XIRR(flujos, fechas)
```

**RATE (Calcular tasa de interés):**
```excel
=RATE(nper, pago, va, vf)
```
Ejemplo: ¿Qué tasa necesito para que 100M crezcan a 200M en 5 años?
```excel
=RATE(5,0,-100000000,200000000)
```

**PV (Valor Presente):**
```excel
=PV(tasa, nper, pago, vf)
```
Inverso de FV.

**FV (Valor Futuro):**
```excel
=FV(tasa, nper, pago, va)
```
Ejemplo: ¿Cuánto tendré en 5 años invirtiendo 10M/año al 15%?
```excel
=FV(0.15, 5, -10000000, 0)
```

**NPER (Número de períodos):**
```excel
=NPER(tasa, pago, va, vf)
```
Ejemplo: ¿En cuántos años recupero 100M con flujos de 20M/año al 10%?
```excel
=NPER(0.10, 20000000, -100000000, 0)
```

---

### 10. MACROS ÚTILES (VBA)

**Actualizar todos los escenarios:**
```vba
Sub ActualizarEscenarios()
    Application.Calculate
    MsgBox "Escenarios actualizados"
End Sub
```

**Exportar dashboard a PDF:**
```vba
Sub ExportarDashboard()
    Sheets("11. Dashboard Ejecutivo").ExportAsFixedFormat _
        Type:=xlTypePDF, _
        Filename:="Dashboard_Sanna.pdf"
End Sub
```

---

## CHECKLIST DE VERIFICACIÓN

### ✅ Antes de presentar el Excel:

1. **Consistencia de datos:**
   - [ ] Todos los supuestos tienen fuentes documentadas
   - [ ] Las tasas (IPC, IPP, etc.) son actuales
   - [ ] Los montos coinciden entre hojas

2. **Fórmulas:**
   - [ ] No hay #REF!, #DIV/0!, #N/A
   - [ ] Las referencias son correctas (absolutas $ donde necesario)
   - [ ] NPV incluye el flujo año 0 correctamente (+C13)

3. **Indicadores:**
   - [ ] VPN > 0
   - [ ] TIR > WACC (proyecto) y > TIO (inversionista)
   - [ ] Saldo final crédito en año 5 = 0
   - [ ] Suma de flujos = Total de ingresos - Total de egresos

4. **Formato:**
   - [ ] Números con formato de miles (comas)
   - [ ] Porcentajes con % y 2 decimales
   - [ ] Colores consistentes (verde=bueno, rojo=malo)
   - [ ] Bordes en tablas importantes

5. **Sensibilidad:**
   - [ ] Al menos 3 variables analizadas
   - [ ] Matriz bidimensional funcionando
   - [ ] Escenarios pesimista/base/optimista definidos

6. **Dashboard:**
   - [ ] Todas las métricas actualizadas
   - [ ] Alertas con formato condicional
   - [ ] Decisión de inversión visible

---

## ERRORES COMUNES Y SOLUCIONES

### ❌ Error 1: NPV da resultado incorrecto

**Problema:** Olvidar sumar la inversión inicial
```excel
❌ Incorrecto: =NPV(WACC,C13:H13)
✅ Correcto: =NPV(WACC,D13:H13)+C13
```

**Razón:** NPV solo calcula VP de flujos FUTUROS. El año 0 ya está en valor presente.

---

### ❌ Error 2: TIR no converge

**Problema:** Excel muestra #NUM!
```excel
=IRR(C13:H13)
```

**Solución:** Agregar valor semilla
```excel
=IRR(C13:H13, 0.15)
```
El 0.15 es una estimación inicial para ayudar a Excel a converger.

---

### ❌ Error 3: Referencia circular

**Problema:** "Excel detectó una referencia circular"

**Causa común:** WACC depende de estructura de capital que depende de WACC.

**Solución:**
1. Archivo → Opciones → Fórmulas
2. Activar cálculo iterativo
3. O romper la circularidad usando celdas auxiliares

---

### ❌ Error 4: PMT devuelve negativo

**Problema:** Cuota sale negativa
```excel
=PMT(0.25, 5, 78563501)
= -29,213,582  (negativo)
```

**Solución:** Agregar signo negativo al monto O al resultado
```excel
=PMT(0.25, 5, -78563501)  → Resultado positivo
O
=-PMT(0.25, 5, 78563501)  → Resultado positivo
```

**Convención Excel:** Pagos salen negativos (salida de dinero).

---

### ❌ Error 5: Tabla de datos no funciona

**Problema:** Al crear tabla de datos, no se calculan los valores

**Causas:**
1. Cálculo manual activado → Presionar F9
2. Fórmula de referencia incorrecta
3. Variables no vinculadas correctamente

**Verificación:**
1. Fórmulas → Opciones de cálculo → Automático
2. La celda de referencia DEBE contener fórmula que usa las variables
3. Las celdas de entrada deben ser las que cambian en la fórmula

---

## RECURSOS ADICIONALES

### 📚 Para profundizar:

1. **Finanzas Corporativas:**
   - Ross, Westerfield & Jaffe - "Corporate Finance"
   - Brealey, Myers & Allen - "Principles of Corporate Finance"

2. **Evaluación de Proyectos:**
   - Sapag Chain - "Preparación y Evaluación de Proyectos"
   - Baca Urbina - "Evaluación de Proyectos"

3. **Excel Financiero:**
   - Simon Benninga - "Financial Modeling"
   - Charls Nyce - "Mastering Financial Modeling in Microsoft Excel"

4. **SaaS Metrics:**
   - David Skok - "SaaS Metrics 2.0" (blog: forentrepreneurs.com)
   - Jason Lemkin - "SaaStr Blog"

5. **Damodaran (Beta y valuación):**
   - http://pages.stern.nyu.edu/~adamodar/
   - Actualización anual de betas por industria

---

## CONTACTO Y SOPORTE

Para dudas sobre el modelo:
1. Verificar fórmulas en este documento
2. Usar auditoría de fórmulas de Excel (Rastrear precedentes/dependientes)
3. Revisar hoja de cálculo de ejemplo adjunta

---

**Última actualización:** Octubre 2025  
**Versión:** 1.0  
**Proyecto:** Sanna - Análisis Financiero Integral

---

*Este documento fue generado como guía complementaria al archivo Excel "analisis_financiero_sanna_completo.xlsx"*
