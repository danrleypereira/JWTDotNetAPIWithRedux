using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using DTOs.Veiculo;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace karkarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VeiculosController : ControllerBase
    {
        private readonly IVeiculoRepository _veiculoRepository;
        public VeiculosController(IVeiculoRepository veiculoRepository)
        {
            _veiculoRepository = veiculoRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VeiculoResponseDTO>> GetVeiculoById(int id)
        {
            var veiculo = await _veiculoRepository.GetVeiculoByIdAsync(id);

            if (veiculo == null)
            {
                return NotFound();
            }

            var veiculoResponseDTO = new VeiculoResponseDTO
            {
                Id = veiculo.Id,
                Nome = veiculo.Nome,
                Marca = veiculo.Marca,
                Modelo = veiculo.Modelo,
                Foto = veiculo.Foto,
                Valor = veiculo.Valor
            };

            return veiculoResponseDTO;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VeiculoResponseDTO>>> Get()
        {
            var veiculos = await _veiculoRepository.GetVeiculosAsync();
            var veiculoResponseDTOs = veiculos.Select(v => new VeiculoResponseDTO
            {
                Id = v.Id,
                Nome = v.Nome,
                Marca = v.Marca,
                Modelo = v.Modelo,
                Foto = v.Foto,
                Valor = v.Valor
            }).ToList();

            return veiculoResponseDTOs;
        }

        // POST api/<VeiculosController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<VeiculosController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<VeiculosController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
