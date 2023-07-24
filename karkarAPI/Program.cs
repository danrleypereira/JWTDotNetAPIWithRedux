using DAL;
using DAL.Repositories;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddHttpsRedirection(options =>
//{
//    options.RedirectStatusCode = StatusCodes.Status308PermanentRedirect;
//    options.HttpsPort = 7247;
//});
builder.Services.AddHealthChecks();

// Add services to the container.
builder.Services.AddDbContext<KarkarDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddControllers();

// Add repositories or other services
builder.Services.AddScoped<IVeiculoRepository, VeiculoRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
app.UseSwagger();
app.UseSwaggerUI();
// }
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    //app.UseHsts();
}
//app.UseHttpsRedirection();

// Enable CORS
app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/health");

app.Run();
