using DAL.Entities;

namespace DAL.Repositories.Interfaces
{
    public interface IVeiculoRepository
    {
        Task<IEnumerable<Veiculo>> GetVeiculosAsync();
        Task<Veiculo> GetVeiculoByIdAsync(int id);
        Task AddVeiculoAsync(Veiculo veiculo);
        Task UpdateVeiculoAsync(Veiculo veiculo);
        Task DeleteVeiculoAsync(int id);
    }
}
