import OpenAI from "openai";

export const callOpenAPI = async (itinerary): Promise<string> => {
  try {
    const content = "I will send you the json string of the itinerary, with its budget, country and list of destinations: " + JSON.stringify(itinerary);

    const openAiKey = "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";
    const openai = new OpenAI({ apiKey: openAiKey, dangerouslyAllowBrowser: true });
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in planning for an overseas adventure. You will be provided with the country, destinations and a budget. " +
            "Help me to plan a trip within the budget. Share three popular tourist spots and three popular restaurants in the area. Make it short and concise.",
        },
        {
          role: "user",
          content: content,
        },
      ],
      temperature: 0.4,
      max_tokens: 1024,
    });

    return completion.choices[0].message.content as string;
  } catch (error) {
    console.error("Error calling OpenAI API:", error.message);
    return "Error, please try again.";
  }
};
