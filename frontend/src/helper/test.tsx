//import { useState } from "react";
//import axios from 'axios';
//import { Configuration, OpenAIApi } from "openai";

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

async function POST(req: Request, res: NextResponse) {
    const body = await req.json();


    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: body.messages,
    });
    console.log(completion.choices[0].message);
    const theResponse = completion.choices[0].message;

    return NextResponse.json({ output: theResponse }, { status: 200 });
}

const mockRequest = {
    json: async () => ({ messages: [{ role: 'user', content: 'Test message' }] }),
};

console.log(await mockRequest.json());

const mockResponse = {
    json: jest.fn(),
    set: jest.fn(),
    _getStatusCode: jest.fn(),
    _getData: jest.fn(),
};

// Call the POST function with the mock request and response
POST(mockRequest as Request, mockResponse as unknown as NextResponse);