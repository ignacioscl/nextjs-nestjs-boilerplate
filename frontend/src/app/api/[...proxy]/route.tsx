import { auth } from "../../../../auth"
import { NextRequest } from "next/server"

// Review if we need this, and why
function stripContentEncoding(result: Response) {
  const responseHeaders = new Headers(result.headers)
  responseHeaders.delete("content-encoding")

  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers: responseHeaders,
  })
}

async function handler(request: NextRequest) {

  const session = await auth()

  const headers = new Headers(request.headers)
  headers.set("Authorization", `Bearer ${session?.accessToken}`)

  let backendUrl =
    process.env.BACKEND_BASE_URL || ''
console.log(backendUrl)
  let url = request.nextUrl.href.replace(request.nextUrl.origin, backendUrl)
  /*console.log("url" + url)
  console.log("headers",headers )*/
  let result = await fetch(url, {
    method: request.method, // Ensures the same method is used for the proxy request
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined, // Only include body for methods that support it
  })

  return stripContentEncoding(result)
}

export const dynamic = "force-dynamic"

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
