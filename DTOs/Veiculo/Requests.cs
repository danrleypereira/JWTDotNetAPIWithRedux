
namespace DTOs.Veiculo
{
    public class CreateVeiculoRequestDTO
    {
        public string Nome { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Foto { get; set; }
        public decimal Valor { get; set; }
    }

    public class UpdateVeiculoRequestDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Foto { get; set; }
        public decimal Valor { get; set; }
    }
}
