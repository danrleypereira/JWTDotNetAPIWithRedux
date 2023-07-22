using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAL;

public class KarkarDbContext : DbContext
{
    public DbSet<Veiculo> Veiculos { get; set; }

    public KarkarDbContext(DbContextOptions<KarkarDbContext> options) : base(options)
    {
    }
}
