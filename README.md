## Getting Started

First, run the development server:

```bash
npm i && npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

This app uses Airtable to store waitlist emails. Create a `.env` file with:

```env
WAITLIST_SECRET=your-waitlist-secret
AIR_TABLE_API_TOKEN=your-airtable-token
AIR_TABLE_BASE_ID=your-airtable-base-id
```

### Setting up Airtable

1. Create an Airtable account at [airtable.com](https://airtable.com)
2. Create a new base and name it "PointsChest"
3. Create a table named "Waitlist" with columns:
   - `email` (Single line text)
   - `createdAt` (Date)
4. Get your API token from [airtable.com/create/tokens](https://airtable.com/create/tokens)
   - Scopes: `data.records:write`
   - Access: Your base
5. Get your base ID from the URL: `airtable.com/appXXXXXXXXXXXXXX`

### Vercel Deployment

Add these environment variables in Vercel → Settings → Environment Variables:
- `AIR_TABLE_API_TOKEN`
- `AIR_TABLE_BASE_ID`

Set scopes to Production and Preview, then redeploy.