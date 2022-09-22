using AllSop.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AllSop.Controllers
{
  [Route("api/products")]
  [ApiController]
  public class ProductsController : ControllerBase
  {
    private readonly IProductRepository _productRepository;

    public ProductsController(IProductRepository productRepository)
    {
      _productRepository = productRepository;
    }

    /// <summary>
    /// Get all available productions
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public IActionResult Get()
    {
      var products = _productRepository.GetProducts();
      return Ok(products);
    }
  }
}