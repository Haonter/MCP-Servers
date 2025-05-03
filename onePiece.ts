import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { McpServer } from  '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import axios from 'axios';
const server = new McpServer({
    name: 'OnePieceServer',
    description: 'OnePieceServer es MCP, que puede ser usado por tu cliente de AI.',
    version: '1.0.0'
});

server.tool(
    'one_piece',
    'Herramienta para buscar informacion sobre personajes de One Piece',
    {
        id: z.string().min(1, 'El id del personaje es requerido').describe('Id del personaje'),
    },
    async ({ id }) => {
        const filtros = ["lista", "personajes", "todos", "all", "*", "characters"];
        if(filtros.includes(id)) {
            try {
                const response = await axios.get(`https://onepieceapi-50cm.onrender.com/personajes`);
                const data = response.data;
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Información de los personajes: ${JSON.stringify(data)}`,
                        }
                    ]
                };
            } catch (e) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Error al buscar el personaje: ${e.message}`,
                        }
                    ],
                    isError: true
                };
            } 
        } else {
            try {
                const response = await axios.get(`https://onepieceapi-50cm.onrender.com/personaje/${id}`);
                const data = response.data;
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Información del personaje: ${JSON.stringify(data)}`,
                        }
                    ]
                };
            } catch (e) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Error al buscar el personaje: ${e.message}`,
                        }
                    ],
                    isError: true
                };
            } 
        }
        
    }
)

const transport = new StdioServerTransport()
await server.connect(transport)