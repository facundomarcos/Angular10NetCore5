using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Validaciones
{
    public class PrimeraLetraMayusculaAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            //el modelo ya esta validado desde el modelo con el [ApiController]
           if (value == null || string.IsNullOrEmpty(value.ToString()))
            {
                return ValidationResult.Success;
            }

            var primeraletra = value.ToString()[0].ToString();

            if (primeraletra != primeraletra.ToUpper())
            {
                return new ValidationResult("La primera letra debe ser mayúscula");
            }
            return ValidationResult.Success;
        }
    }
}
