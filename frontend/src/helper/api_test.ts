import request from 'supertest';
import handler from './api'; // Adjust the path based on your project structure

jest.mock('openai', () => ({
    __esModule: true,
    default: {
        chat: {
            completions: {
                create: jest.fn().mockResolvedValue({
                    choices: [{ message: 'Mocked OpenAI response' }],
                }),
            },
        },
    },
}));

describe('POST /api/your-api-endpoint', () => {
    it('responds with a JSON object containing the OpenAI response', async () => {
        const response = await request(handler)
            .post('/api/your-api-endpoint') // Adjust the endpoint path
            .send({
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: 'Who won the world series in 2020?' },
                ],
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('output');
        expect(response.body.output).toBe('Mocked OpenAI response');
    });
});
