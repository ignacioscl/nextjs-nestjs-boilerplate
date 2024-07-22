#==============================================================
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Arguments
ARG BACKEND_BASE_URL
ARG AUTH_KEYCLOAK_ID
ARG AUTH_KEYCLOAK_SECRET
ARG AUTH_KEYCLOAK_ISSUER
ARG AUTH_SECRET
ARG AUTH_URL
ARG AUTH_TRUST_HOST
ARG PUBLIC_URL
RUN echo 'Verificacion de print ${BACKEND_BASE_URL}'
RUN echo ${BACKEND_BASE_URL}
# Environment Variables
ENV BACKEND_BASE_URL=${BACKEND_BASE_URL}
ENV AUTH_KEYCLOAK_ID=${AUTH_KEYCLOAK_ID}
ENV AUTH_KEYCLOAK_SECRET=${AUTH_KEYCLOAK_SECRET}
ENV AUTH_KEYCLOAK_ISSUER=${AUTH_KEYCLOAK_ISSUER}
ENV AUTH_SECRET=${AUTH_SECRET}
ENV AUTH_URL=${AUTH_URL}
ENV AUTH_TRUST_HOST=${AUTH_TRUST_HOST}
ENV PUBLIC_URL=${PUBLIC_URL}

# Copy the main application
COPY . ./

# Install dependencies and build the application
RUN npm install
RUN npm run build

#==============================================================
FROM node:18-alpine
WORKDIR /app

# Copy the build files from the previous step
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules /app/node_modules

# Expose the port that Next.js will use
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
