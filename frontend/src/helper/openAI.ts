import OpenAI from "openai";

export const callOpenAPI = async (itinerary) => {
  try {
    const inputText = "What is 1 + 1?";
    const content = "I will ";
    console.log("TESTING")

    const openAiKey = "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";
    const openai = new OpenAI({ apiKey: openAiKey, dangerouslyAllowBrowser: true });
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in planning for an overseas adventure. You will be provided with the country, destinations and a budget. " +
            "Help me to plan a trip within the budget. Share three popular tourist spots and three popular restaurants in the area.",
        },
        {
          role: "user",
          content: inputText,
        },
      ],
      temperature: 0.4,
      max_tokens: 1024,
    });

    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error.message);
    return "";
  }
};
