## como subir o banco e rodar a aplicação?
- estou usando um banco de desenvolvimento que fica disponível em um endereço público
- se for rodar windows é só usar o VS Community 2022
- se for rodar no linux:
0. dotnet restore && dotnet build
1. dotnet ef database update
2.  dotnet run --project karkarAPI/karkarAPI.csproj

## criar migrações
dotnet ef migrations add InitialCreate --project DAL --startup-project karkarAPI
dotnet ef database update --project DAL --startup-project karkarAPI

# Extraia dados da kavak.com/br/carros-usados
Entre no site
Rode o script javascript no devtools do chrome.
use o script python para inserir no banco os dados extraídos

