## como subir o banco e rodar a aplicação?
- estou usando um banco de desenvolvimento que fica disponível em um endereço público
- se for rodar windows é só usar o VS Community 2022
- se for rodar no linux:
0. dotnet restore && dotnet build
1. dotnet ef database update
2.  dotnet run --project karkarAPI/karkarAPI.csproj

## Autenticação
### Usuário já existente no banco com permissão de admin
    usuario: user@example.com
    senha: string
### Criar usuário
- Importe o arquivo do insomnia (Insomnia_export_file.json) que tem todas as rotas necessárias, ou abra o endpoint /swagger
- Ou se preferir, veja o arquivo Insomnia_export_file.har

## PRODUÇÃO
- amplify com CI/CD para o app react
- app runner com CD para a webapi .net

### testando produção local
- dotnet dev-certs https -ep \.aspnet\https\aspnetapp.pfx -p <CREDENTIAL_PLACEHOLDER>
- dotnet dev-certs https --trust
- modifique o docker-compose para pegar seu certificado
- docker-compose up --build

## criar migrações
- dotnet ef migrations add InitialCreate --project DAL --startup-project karkarAPI
- dotnet ef database update --project DAL --startup-project karkarAPI

# Extraia dados da kavak.com/br/carros-usados
- Entre no site
- Rode o script javascript no devtools do chrome.
- use o script python para inserir no banco os dados extraídos

