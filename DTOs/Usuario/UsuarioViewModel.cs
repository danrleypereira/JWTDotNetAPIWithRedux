using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace DTOs.User
{
    public class UsuarioRegistroRequest
    {
        [Required(ErrorMessage = "The field {0} is required.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "The field {0} is required.")]
        [EmailAddress(ErrorMessage = "The field {0} must be a valid email address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The field {0} is required.")]
        [StringLength(100, ErrorMessage = "The field {0} must be between {2} and {1} characters long.", MinimumLength = 6)]
        public string Senha { get; set; }

        [Compare("Senha", ErrorMessage = "The passwords do not match.")]
        public string SenhaConfirmacao { get; set; }
    }

    public class UsuarioLoginRequest
    {
        [Required(ErrorMessage = "The field {0} is required.")]
        [EmailAddress(ErrorMessage = "The field {0} must be a valid email address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The field {0} is required.")]
        [StringLength(100, ErrorMessage = "The field {0} must be between {2} and {1} characters long.", MinimumLength = 6)]
        public string Senha { get; set; }
    }

    public class UsuarioViewModel
    {
        public string Nome { get; set; }
        public string Email { get; set; }
    }

    public class UsuarioLoginResponse
    {
        public string AccessToken { get; set; }
        public double ExpiresIn { get; set; }
        public UsuarioToken UsuarioToken { get; set; }
    }

    public class UsuarioToken
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public IEnumerable<UsuarioClaim> Claims { get; set; }
    }

    public class UsuarioClaim
    {
        public string Value { get; set; }
        public string Type { get; set; }
    }
    public class AuthenticationResponse
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public string[]? Roles { get; set; }
    }
}
