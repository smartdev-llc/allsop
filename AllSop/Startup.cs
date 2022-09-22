using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AllSop.Promotions;
using AllSop.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace AllSop
{
  public class Startup
  {
    readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors(options =>
      {
        options.AddPolicy(name: MyAllowSpecificOrigins,
                  policy =>
                  {
                    policy.WithOrigins("http://localhost:4200", "https://mango-bay-093940b03.1.azurestaticapps.net").AllowAnyHeader().AllowAnyMethod();
                  });
      });
      services.AddMvc()
          .AddJsonOptions(options =>
          {
            options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
          })
          .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
      services.AddSwaggerGen();
      services.AddTransient<IProductRepository, ProductRepository>();
      services.AddTransient<ICartRepository, CartRepository>();
      services.AddTransient<IPromotionProvider, StaticPromotionProvider>();
      services.AddTransient<ICodePromotionRepository, CodePromotionRepository>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseSwagger();
      app.UseSwaggerUI();
      app.UseCors(MyAllowSpecificOrigins);
      app.UseMvc();
    }
  }
}
