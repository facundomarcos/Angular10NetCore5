using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using PeliculasAPI.Filtros;

namespace PeliculasAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //configuracion del CORS para conectarse con angular
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    //usando en IConfiguration inyectamos la url en la variable
                    var frontendURL = Configuration.GetValue<string>("frontend_url");
                    //especifica los permisos, que permisos y a quien
                    builder.WithOrigins(frontendURL)
                    //permitir todos los metodos
                    .AllowAnyMethod()
                    //permitir todos los cabeceras
                    .AllowAnyHeader();
                });
            });

            //AddTransient es el tiempo de vida mas corto de un servicio, 
            //se entregan instancias distintas en una misma peticion http
            //AddScope el tiempo de vida de la clase instanciada va a ser durante toda la peticion http y su contexto
            //o sea 2 instancias en la misma peticion http van a ser la misma instancia 
            //AddSingleton servira durante la ejecucion de la aplicacion (se va a compartir entre clientes)
            // a los clientes se les va a servir la misma instancia de la clase
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();
            services.AddControllers(options =>
                {
                    options.Filters.Add(typeof(FiltroDeExcepcion));
                });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PeliculasAPI", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env
            )
        {
           
           

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PeliculasAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
