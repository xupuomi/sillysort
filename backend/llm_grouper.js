import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config();

// console.log(process.env.GOOGLE_API_KEY);

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  maxOutputTokens: 4096,
  temperature: 0.01,
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateJson(json) {
    var data = json;
    // console.log(json)
    const res = await model.invoke([
        [
          "human",
          `
          You are a file organizing agent, who organizes files based on filenames. You will be given a json of all the file names in the current directory.
    
          You will create at most 10 folders. You will then return a file directory structure in the form of a JSON, where the keys are the names of folders, and the values are arrays of filenames. 
          
          Make sure to return only a JSON file.
          
          Filenames:
          ${JSON.stringify(json)}
          `,
        ],
      ]);
    // console.log(res.content);
    let begin = 0;
    let end = 0;
    for (let i = 0; i < res.content.length; i++) {
      if (res.content[i] == "{") {
        begin = i;
        break;
      }
    }
    for (let i = res.content.length - 1; i >= 0; i--) {
      if (res.content[i] == "}") {
        end = i;
        break;
      }
    }
    // console.log(res.content.substring(begin, end+1));
    return JSON.parse(res.content.substring(begin, end+1));
}