using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("Veiculos")]
    public class Veiculo
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [Column("Nome")]
        [StringLength(100)]
        public string Nome { get; set; }

        [Required]
        [Column("Marca")]
        [StringLength(100)]
        public string Marca { get; set; }

        [Required]
        [Column("Modelo")]
        [StringLength(100)] 
        public string Modelo { get; set; }

        [Required]
        [Url] 
        [Column("Foto")]
        public string Foto { get; set; }

        [Required]
        [Column("Valor")]
        [Range(0, 9999999999999999.99)] // This sets a range for the decimal value. Adjust it according to your needs.
        public decimal Valor { get; set; }
    }
}

//CREATE TABLE Veiculos (
//    Id INT PRIMARY KEY IDENTITY,
//    Nome NVARCHAR(100) NOT NULL,
//    Marca NVARCHAR(100) NOT NULL,
//    Modelo NVARCHAR(100) NOT NULL,
//    Foto NVARCHAR(MAX) NOT NULL,
//    Valor DECIMAL(18, 2) NOT NULL
//);
