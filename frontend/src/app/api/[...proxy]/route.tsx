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

  let url = request.nextUrl.href.replace(request.nextUrl.origin, backendUrl)
  console.log("url" + url)
  //console.log("headers",headers )
  const options = {
    method: request.method, // Ensures the same method is used for the proxy request
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined, // Only include body for methods that support it
    duplex: 'half',
  }

    
    try {
      let result = await fetch(url, options);
      return stripContentEncoding(result);
    } catch (e) {
      console.log("eeeoe",e);
  
      // Verificar si el error es un TypeError y si el mensaje contiene "fetch failed"
      if (e instanceof TypeError && e.message.includes("fetch failed")) {
        const errorMessage = "Network Error: Failed to fetch";
        
        const err = {
          statusCode: 500,
          path: request.nextUrl.origin,
          message: errorMessage,
          validationErrors: null,
          body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
          method: request.method,
        };
  
        // Devuelve el error customizado
        return new Response(JSON.stringify(err), { status: 500, headers: { 'Content-Type': 'application/json' } });
      } else if (e instanceof Response) {
        // Si es una instancia de Response, intenta devolver el mismo response del fetch
        return stripContentEncoding(e);
      } else {
        // Para cualquier otro tipo de error, envuelve el error y lo devuelve como un error del servidor
        const err = {
          statusCode: 500,
          path: request.nextUrl.origin,
          message: "Proxy Error: " + e.message,
          validationErrors: null,
          body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
          method: request.method,
        };
  
        return new Response(JSON.stringify(err), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
    }

  

  
}

export const dynamic = "force-dynamic"

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
