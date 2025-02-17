# ChatGPT Node.js Server

This project integrates ChatGPT with a Node.js server to fetch country data in JSON format.

## Installation

1. Install dependencies:
   ```sh
   npm install
   ```

2. Create a `.env` file and add your OpenAI API key:
   ```sh
   OPENAI_API_KEY=your_openai_api_key
   PORT=3000
   ```

## Running the Server

```sh
node server.js
```

## API Endpoint

- **GET /get-countries** - Fetches a JSON list of American continent countries with name, capital, currency code, and phone code.

## Dependencies

- Express
- Axios
- Dotenv
- OpenAI SDK
