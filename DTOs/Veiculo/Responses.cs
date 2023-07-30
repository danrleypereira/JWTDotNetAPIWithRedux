using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Veiculo
{
    public class VeiculoResponseDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Foto { get; set; }
        public decimal Valor { get; set; }
    }
    public class PaginatedVeiculosResponseDTO
    {
        public IEnumerable<VeiculoResponseDTO> Veiculos { get; set; }
        public int CurrentPage { get; set; }
        public int NextPage { get; set; }
        public int PreviousPage { get; set; }
        public int TotalPages { get; set; }
    }
}
