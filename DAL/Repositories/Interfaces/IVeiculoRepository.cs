using DAL.Entities;

namespace DAL.Repositories.Interfaces
{
    public interface IVeiculoRepository
    {
        Task<IEnumerable<Veiculo>> GetVeiculosAsync();
        Task<IEnumerable<Veiculo>> GetVeiculosAsync(int page, int pageSize);
        Task<Veiculo> GetVeiculoByIdAsync(int id);
        Task<int> GetTotalVeiculosAsync();
        Task AddVeiculoAsync(Veiculo veiculo);
        Task UpdateVeiculoAsync(Veiculo veiculo);
        Task DeleteVeiculoAsync(int id);
    }
}
