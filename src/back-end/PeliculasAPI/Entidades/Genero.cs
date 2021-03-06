﻿using PeliculasAPI.Validaciones;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Entidades
{
    public class Genero
        //implementa interface de validacion por modelo
        //primero se ejecutan las validaciones por modelo, luego por controlador
        //Comentario by JP
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(maximumLength: 50)]
        //[PrimeraLetraMayuscula]
        public string Nombre { get; set; }

      
          
            
        }
    }

