
# MCP-Server (OnePieceServer & Geolocalizar)

Este proyecto contiene dos servidores MCP desarrollados con [`@modelcontextprotocol/sdk`](https://www.npmjs.com/package/@modelcontextprotocol/sdk). Cada uno expone una herramienta útil que puede ser integrada por un cliente AI compatible con MCP.

---

## 📁 Contenido

- onePiece.ts: Servidor MCP para consultar personajes de One Piece
- geolocalizar.ts: Servidor MCP para geolocalizar direcciones IP públicas

---

## ⚙️ Requisitos

- Node.js ≥ 18
- npm ≥ 9

### 📦 Instalar dependencias

```bash
npm install @modelcontextprotocol/sdk axios zod
npm install -D tsx
```

---

## 🏴‍☠️ OnePieceServer MCP

### 📄 Descripción

`OnePieceServer` permite consultar información de personajes del anime/manga One Piece, ya sea individualmente o toda la lista disponible.

### 🚀 Ejecutar

```bash
npx tsx onePiece.ts
```

También puedes usar el Inspector MCP:

```bash
npx -y @modelcontextprotocol/inspector npx -y tsx onePiece.ts
```

### 🛠 Herramienta expuesta: `one_piece`

- **Input**:
  ```json
  { "id": "1" }
  ```

  Para obtener la lista completa:
  ```json
  { "id": "todos" }
  ```

- **Output**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "Información del personaje: { ... }"
      }
    ]
  }
  ```

### 🌐 API usada

- `https://onepieceapi-50cm.onrender.com/personaje/{id}`
- `https://onepieceapi-50cm.onrender.com/personajes`

---

## 🌍 Geolocalizar MCP

### 📄 Descripción

`Geolocalizar` permite obtener información geográfica aproximada de una dirección IP (IPv4) pública.

### 🚀 Ejecutar

```bash
npx tsx main.ts
```

O usar con el Inspector MCP:

```bash
npx -y @modelcontextprotocol/inspector npx -y tsx main.ts
```

### 🛠 Herramienta expuesta: `geolocalizar`

- **Input**:
  ```json
  { "ip": "8.8.8.8" }
  ```

- **Output**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "{ \"ip\": \"8.8.8.8\", \"country\": \"United States\", ... }"
      }
    ]
  }
  ```

### 🔐 Validación

Usa `zod` para validar que el input sea una IP válida en formato IPv4.

### ⚠️ Nota

La API `https://ip.guide/{ip}` puede estar fuera de servicio. Se recomienda reemplazarla por una más estable como:

```ts
https://ip-api.com/json/${ip}
```

---

## 📁 Estructura del Proyecto

```
.
├── geolocalizar.ts   # MCP Geolocalizar
├── onePiece.ts       # MCP OnePieceServer
├── package.json      # Archivo de configuracion de NPM
└── README.md         # Este archivo
```

---

## 🧪 Desarrollo

Ambos servidores se comunican mediante `stdin` y `stdout` usando `StdioServerTransport`, lo que permite su ejecución fácil desde CLI o integración con clientes MCP.

---

## 🧑‍💻 Autor

Desarrollado por **Diego Rodríguez**  
✉️ contacto@diegorodriguez.dev

---
