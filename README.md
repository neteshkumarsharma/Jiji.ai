# Learn with Jiji - AI Learning Companion Backend

Project: Learn with Jiji


Description: A scalable backend service for an AI-driven learning companion that personalizes content delivery for professionals and teams. 

## 📋 Overview
This repository contains the backend infrastructure for Jiji, an AI agent designed to help users learn complex topics through interactive dialogue. The service exposes a REST API that accepts user queries, retrieves curated learning materials (presentations, videos) from a Supabase database, and returns structured, context-aware responses to the frontend. 

## 🛠 Tech Stack

- Runtime: Node.js 


- Framework: Express.js 


- Database: Supabase (PostgreSQL) 


- Storage: Supabase Storage (for hosting learning assets) 


- Security: Row Level Security (RLS) & API Key Authentication 
+1

## 🚀 Getting Started
### 1. Prerequisites
- Node.js (v14 or higher)

- A Supabase project with Database and Storage enabled.

### 2. Installation


git clone https://github.com/YOUR_USERNAME/learn-with-jiji-backend.git
cd learn-with-jiji-backend

npm install

### 3. Environment Configuration
Create a .env file in the root directory and configure your Supabase credentials:


PORT=3000
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_public_anon_key_here



### 4. Database Setup
Navigate to the schema.sql file provided in this repository.

Execute the SQL script in your Supabase SQL Editor to:

- Create necessary tables (profiles, resources, queries). 

- Enable Row Level Security (RLS) policies. 
+1

- Insert initial mock data for testing.

5. Start the Server

npm start
## 🔌 API Documentation
### Search & Respond

Endpoint: POST /ask-jiji Description: Processes a natural language query and returns a synthesized answer along with relevant learning resources. 
+1

### Request Body:


{
  "userId": "uuid-user-id",
  "query": "Explain RAG"
}
Response (200 OK):


{
  "answer": "Retrieval-Augmented Generation (RAG) combines search with large language models...",
  "resources": [
    {
      "title": "Introduction to RAG",
      "type": "ppt",
      "url": "https://<project>.supabase.co/storage/v1/object/public/learning-content/rag.pdf"
    },
    {
      "title": "RAG Implementation Guide",
      "type": "video",
      "url": "https://youtube.com/watch?v=example"
    }
  ]
}

## 🔒 Security Architecture

This project implements a secure-by-default architecture using Supabase RLS:


- Data Isolation: Row Level Security policies ensure users can only access their own query history. 
+1

- Public Access: The resources table is optimized for public read access to ensure low-latency content delivery, while write access is restricted to service roles.


- Input Validation: The API layer implements strict validation to sanitize user inputs before processing. 

## 🗺 Roadmap & Future Improvements
Planned features for the next iteration of the Jiji backend:

### Semantic Search (Vector Embeddings):

- Upgrade the current keyword search to a vector-based retrieval system using pgvector. This will allow Jiji to understand the intent behind a query (e.g., matching "machine learning basics" to "Intro to AI") rather than relying on exact text matches.

###LLM Integration:

- Connect the "Search & Respond" flow to a live LLM (like OpenAI GPT-4 or Gemini) to generate dynamic, real-time answers based on the retrieved context. 
+1

### User Personalization:

- Implement logic to track user progress and tailor content recommendations based on previous interactions.
