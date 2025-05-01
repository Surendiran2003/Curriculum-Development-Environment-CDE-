import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();
const port = 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

app.post("/api/gemini-prereqs", async (req, res) => {
  const { prompt } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const suggestions = text
      .split("\n")
      .map((s) => s.replace(/^[\d\-\*\.]+\s*/, "").trim())
      .filter((s) => s.length > 0);

    res.json({ suggestions });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate suggestions" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
