import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  maxOutputTokens: 4096,
  temperature: 0.01,
  apiKey: "AIzaSyA2lbrp05GynZv10oOxij2OKOfPKa8kW8M",//process.env.GOOGLE_API_KEY,
//  safetySettings: [
//    {
//      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
//    },
//  ],
});
// Try to be as specific as possible with category names.
const res = await model.invoke([
    [
      "human",
      `
      You are a file organizing agent, who organizes files based on filenames. You will be given a json of all the file names in the current directory.

      You will then return a file directory structure in the form of a JSON, where the keys are the names of subdirectories, and the values are arrays of filenames. Try to be specific with category names.
      
      Make sure to return only a JSON file.
      
      Filenames:
      {
          ".DS_Store": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/.DS_Store"
          },
          ".localized": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/.localized"
          },
          "1BA3_33_hll": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/1BA3_33_hll.pdf"
          },
          "cs225sp22-lab_avl-handout": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/cs225sp22-lab_avl-handout.pdf"
          },
          "cs225sp22-lab_avl-handout-solution": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/cs225sp22-lab_avl-handout-solution.pdf"
          },
          "cs225sp24-09-Trees-slides": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/cs225sp24-09-Trees-slides.pdf"
          },
          "cs225sp24-11-BST-slides": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/cs225sp24-11-BST-slides.pdf"
          },
          "cs225sp24-15-AVL-slides": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/cs225sp24-15-AVL-slides.pdf"
          },
          "Example 5- Matrix Multiplication Time Complexity": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/Example 5- Matrix Multiplication Time Complexity.pdf"
          },
          "fdce42d9c8d8dc4eac7a9db3c1978e18_MIT18_06SCF11_Ses2.1sum": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/fdce42d9c8d8dc4eac7a9db3c1978e18_MIT18_06SCF11_Ses2.1sum.pdf"
          },
          "LAB06.2": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/LAB06.2.1 - CS 233 PrairieLearn_files"
          },
          "LAB06.2.1 - CS 233 PrairieLearn": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/LAB06.2.1 - CS 233 PrairieLearn.html"
          },
          "lec05": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/lec05.pdf"
          },
          "lect12-scapegoat": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/lect12-scapegoat.pdf"
          },
          "moore-tutorial": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/moore-tutorial.pdf"
          },
          "random-access-iterators": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/random-access-iterators.pdf"
          },
          "s24-hw4": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/s24-hw4.pdf"
          },
          "s24-hw4(1)": {
              "filepath": "/Users/kaustubhkhulbe/Downloads/s24-hw4(1).pdf"
          }
      }`,
    ],
  ]);
  
console.log(res.content);