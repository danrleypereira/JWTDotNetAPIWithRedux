using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class VeiculoRepository : IVeiculoRepository
    {
        private readonly KarkarDbContext _context;

        public VeiculoRepository(KarkarDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Veiculo>> GetVeiculosAsync()
        {
            return await _context.Veiculos.ToListAsync();
        }

        public async Task<Veiculo> GetVeiculoByIdAsync(int id)
        {
            return await _context.Veiculos.FindAsync(id);
        }

        public async Task AddVeiculoAsync(Veiculo veiculo)
        {
            _context.Veiculos.Add(veiculo);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateVeiculoAsync(Veiculo veiculo)
        {
            _context.Entry(veiculo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteVeiculoAsync(int id)
        {
            var veiculo = await _context.Veiculos.FindAsync(id);
            if (veiculo != null)
            {
                _context.Veiculos.Remove(veiculo);
                await _context.SaveChangesAsync();
            }
        }
    }
}
