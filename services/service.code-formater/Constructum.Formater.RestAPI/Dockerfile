FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Constructum.Formater.RestAPI/Constructum.Formater.RestAPI.csproj", "Constructum.Formater.RestAPI/"]
RUN dotnet restore "Constructum.Formater.RestAPI/Constructum.Formater.RestAPI.csproj"
COPY . .
WORKDIR "/src/Constructum.Formater.RestAPI"
RUN dotnet build "Constructum.Formater.RestAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Constructum.Formater.RestAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Constructum.Formater.RestAPI.dll"]
