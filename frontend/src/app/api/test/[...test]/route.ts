// app/api/test/[...test]/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Log the request method and URL
  console.log(`Received GET request at ${request.url}`);

  // Log the query parameters
  const url = new URL(request.url);
  console.log('Query parameters:', url.searchParams);

  // Send a response back to the client
  return NextResponse.json({ message: 'GET request received', query: Object.fromEntries(url.searchParams) });
}

