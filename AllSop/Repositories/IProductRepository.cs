using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AllSop.Entities;

namespace AllSop.Repositories
{
    public interface IProductRepository
    {
        /// <summary>
        /// Get all available products
        /// </summary>
        /// <returns></returns>
        IEnumerable<Product> GetProducts();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Product GetProductById(Guid id);

        bool UpdateProduct(Product product);
    }
}
