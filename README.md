## como subir o banco e rodar a aplicação?


## criar migrações
dotnet ef migrations add InitialCreate --project DAL --startup-project karkarAPI
dotnet ef database update --project DAL --startup-project karkarAPI

# Extraia dados da kavak.com/br/carros-usados
Entre no site
Rode o script javascript no devtools do chrome.
use o script python para inserir no banco os dados extraídos

