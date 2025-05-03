import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { McpServer } from  '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import axios from 'axios';

const server = new McpServer({
    name: 'Geolocalizar',
    description: 'Geolocalizar es un MCP que puede ser usado por tu cliente de AI para obtener información sobre la ubicación de una IP.',
    version: '1.0.0'
});

server.tool(
    'geolocalizar',
    'Herramienta para geolocalizar una IP y obtener información sobre la ubicación de la misma',

    {
        ip: z.string().regex(/^(?:\d{1,3}\.){3}\d{1,3}$/, 'Debe ser una dirección IP válida (IPv4)').describe('Dirección IP'),
    },
    async ({ ip }) => {
        try {
            const response = await axios.get(`https://ip.guide/${ip.trim()}`);
            const data = response.data;
    
            if (!data.location) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No se encontró información sobre la IP ${ip}.`,
                        }
                    ],
                    isError: true
                };
            }
    
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(data, null, 2),
                    }
                ],
            };
    
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error al consultar la IP ${ip}: ${error?.message || 'Error desconocido'}`,
                    }
                ],
                isError: true
            };
        }
    }
);


const transport = new StdioServerTransport()
await server.connect(transport)
