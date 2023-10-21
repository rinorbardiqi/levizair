import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { google } from "googleapis";
import language from "@google-cloud/language";

const auth = new google.auth.GoogleAuth({
  keyFile: `${process.cwd()}/levizair.json`,
});

const client = new language.LanguageServiceClient({
  auth,
});

async function analyzeText(text: string) {
  const request = {
    document: {
      content: text,
      type: "PLAIN_TEXT" as const,
    },
    features: {
      extractEntities: {
        types: ["LOCATION"],
      },
      analyzeText: text,
    },
  };

  try {
    return client.analyzeEntities(request).then((data) => {
      const entities = data[0].entities;
      return entities?.filter((items) => items.type === "LOCATION");
    });
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

export const googleAiRouter = createTRPCRouter({
  predict: publicProcedure.query(async ({ ctx }) => {
    const textToAnalyze =
      "A user has travelled twice to London and once to Paris";

    const response = await analyzeText(textToAnalyze);

    console.log("response", response);

    return {
      predicted: `Hello`, // Update the response based on the actual data received from the AI platform
    };
  }),
});
