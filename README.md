### Setting keycloak
https://medium.com/inspiredbrilliance/implementing-authentication-in-next-js-v13-application-with-keycloak-part-1-f4817c53c7ef


### Config dev
```bash
cd backend
mv .env.template .env

cd fronend
mv .env.template .env
```
### Local to start the frontend reading the .env from the frontend project


- `docker-compose -f docker-compose-frontend.env.yml build`
- `docker-compose -f docker-compose-frontend.env.yml up`
- `docker exec -it <container_name> sh -c 'printenv'`

#### Command line for rundeck 


docker-compose -f docker-compose-frontend.yml build \
  --build-arg BACKEND_BASE_URL=${option.BACKEND_BASE_URL} \
  --build-arg AUTH_KEYCLOAK_ID=${option.AUTH_KEYCLOAK_ID} \
  --build-arg AUTH_KEYCLOAK_SECRET=${option.AUTH_KEYCLOAK_SECRET} \
  --build-arg AUTH_KEYCLOAK_ISSUER=${option.AUTH_KEYCLOAK_ISSUER} \
  --build-arg AUTH_SECRET=${option.AUTH_SECRET} \
  --build-arg AUTH_URL=${option.AUTH_URL} \
  --build-arg AUTH_TRUST_HOST=${option.AUTH_TRUST_HOST} \
  --build-arg PUBLIC_URL=${option.PUBLIC_URL}

docker-compose -f docker-compose-frontend.yml up -d


#### Example
export BACKEND_BASE_URL=http://192.168.1.3:5000
export AUTH_KEYCLOAK_ID=
export AUTH_KEYCLOAK_SECRET=
export AUTH_KEYCLOAK_ISSUER=
export AUTH_SECRET=
export AUTH_URL=http://localhost:3000
export AUTH_TRUST_HOST=http://localhost:3000
export PUBLIC_URL=/


docker-compose -f docker-compose-frontend.yml build 
docker-compose -f docker-compose-frontend.yml up



### Local setup to start the frontend reading from export variables and backend copying the .env from outside the project

export BACKEND_BASE_URL=
export AUTH_KEYCLOAK_ID=
export AUTH_KEYCLOAK_SECRET=
export AUTH_KEYCLOAK_ISSUER=
export AUTH_SECRET=
export AUTH_URL=http://localhost:3000
export AUTH_TRUST_HOST=http://localhost:3000
export PUBLIC_URL=/

docker-compose -f docker-compose-server.yml build 
docker-compose -f docker-compose-server.yml up


### Local setup to start the backend by copying the .env from outside the project


docker-compose -f docker-compose-backend.yml build 
docker-compose -f docker-compose-backend.yml up