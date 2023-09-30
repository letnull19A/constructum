FROM node

EXPOSE 3689

COPY ./packages ./app/packages 
COPY ./services/service.auth ./app/auth
COPY ./services/service.identify ./app/identify

WORKDIR /app/identify
RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]

ENTRYPOINT ["npm", "run", "start"]