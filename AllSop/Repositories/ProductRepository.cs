using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AllSop.Entities;

namespace AllSop.Repositories
{
  public class ProductRepository : IProductRepository
  {
    private static readonly List<Category> Categories = new List<Category>();
    private static readonly List<Product> Products = new List<Product>();

    static ProductRepository()
    {
      var meatPoultry = new Category()
      {
        Id = Guid.NewGuid(),
        Name = "Meat & Poultry"
      };
      var fruitVegetables = new Category()
      {
        Id = Guid.NewGuid(),
        Name = "Fruit & Vegetables"
      };
      var drinks = new Category()
      {
        Id = Guid.NewGuid(),
        Name = "Drinks"
      };
      var confectionaryDesserts = new Category()
      {
        Id = Guid.NewGuid(),
        Name = "Confectionary & Desserts"
      };
      var bakingCookingIngredients = new Category()
      {
        Id = Guid.NewGuid(),
        Name = "Baking/Cooking Ingredients"
      };
      var miscellaneousItems = new Category()
      {
        Id = Guid.NewGuid(),
        Name = "Miscellaneous Items"
      };
      Categories.AddRange(new List<Category>()
        { meatPoultry, fruitVegetables, drinks, confectionaryDesserts, bakingCookingIngredients, miscellaneousItems });

      var productList = new List<Product>()
        {
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Chicken Fillets, 6 x 100g",
            CategoryId = meatPoultry.Id,
            Category = meatPoultry,
            Price = 4.5m,
            OldPrice = null,
            AvailableQuantity = 12,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Sirloin Steaks, 4 x 6-8oz",
            CategoryId = meatPoultry.Id,
            Category = meatPoultry,
            Price = 45.7m,
            OldPrice = null,
            AvailableQuantity = 6,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Whole Free-Range Turkey, 1 x 16-18lbs",
            CategoryId = meatPoultry.Id,
            Category = meatPoultry,
            Price = 43.2m,
            OldPrice = 48.25m,
            AvailableQuantity = 8,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Granny Smith Apples, 4 x 16 each",
            CategoryId = fruitVegetables.Id,
            Category = fruitVegetables,
            Price = 3.75m,
            OldPrice = null,
            AvailableQuantity = 0,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Loose Carrots, 4 x 20 each",
            CategoryId = fruitVegetables.Id,
            Category = fruitVegetables,
            Price = 2.67m,
            OldPrice = null,
            AvailableQuantity = 2,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Mandarin Oranges, 6 x 10 x 12",
            CategoryId = fruitVegetables.Id,
            Category = fruitVegetables,
            Price = 12.23m,
            OldPrice = null,
            AvailableQuantity = 8,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Cauliflower Florets, 10 x 500g",
            CategoryId = fruitVegetables.Id,
            Category = fruitVegetables,
            Price = 5m,
            OldPrice = 6.75m,
            AvailableQuantity = 5,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Coca-Cola, 6 x 2L",
            CategoryId = drinks.Id,
            Category = drinks,
            Price = 8.3m,
            OldPrice = 8.5m,
            AvailableQuantity = 6,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Still Mineral Water, 6 x 24 x 500ml",
            CategoryId = drinks.Id,
            Category = drinks,
            Price = 21.75m,
            OldPrice = null,
            AvailableQuantity = 9,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Sparkling Mineral Water, 6 x 24 x 500ml",
            CategoryId = drinks.Id,
            Category = drinks,
            Price = 25.83m,
            OldPrice = null,
            AvailableQuantity = 16,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Mars Bar, 6 x 24 x 50g",
            CategoryId = confectionaryDesserts.Id,
            Category = confectionaryDesserts,
            Price = 42.82m,
            OldPrice = null,
            AvailableQuantity = 4,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Peppermint Chewing Gum, 6 x 50 x 30g",
            CategoryId = confectionaryDesserts.Id,
            Category = confectionaryDesserts,
            Price = 35.7m,
            OldPrice = null,
            AvailableQuantity = 6,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Strawberry Cheesecake, 4 x 12 portions",
            CategoryId = confectionaryDesserts.Id,
            Category = confectionaryDesserts,
            Price = 8.52m,
            OldPrice = null,
            AvailableQuantity = 0,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Vanilla Ice Cream, 6 x 4L",
            CategoryId = confectionaryDesserts.Id,
            Category = confectionaryDesserts,
            Price = 3.8m,
            OldPrice = null,
            AvailableQuantity = 2,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Plain Flour, 10 x 1kg",
            CategoryId = bakingCookingIngredients.Id,
            Category = bakingCookingIngredients,
            Price = 6.21m,
            OldPrice = null,
            AvailableQuantity = 4,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Icing Sugar, 12 x 500g",
            CategoryId = bakingCookingIngredients.Id,
            Category = bakingCookingIngredients,
            Price = 9.38m,
            OldPrice = null,
            AvailableQuantity = 6,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Free-Range Eggs, 10 x 12 each",
            CategoryId = bakingCookingIngredients.Id,
            Category = bakingCookingIngredients,
            Price = 9.52m,
            OldPrice = null,
            AvailableQuantity = 9,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Caster Sugar, 16 x 750g",
            CategoryId = bakingCookingIngredients.Id,
            Category = bakingCookingIngredients,
            Price = 12.76m,
            OldPrice = null,
            AvailableQuantity = 13,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Kitchen Roll, 100 x 300 sheets",
            CategoryId = miscellaneousItems.Id,
            Category = miscellaneousItems,
            Price = 43.92m,
            OldPrice = null,
            AvailableQuantity = 19,
          },
          new Product()
          {
            Id = Guid.NewGuid(),
            Name = "Paper Plates, 10 x 200 each",
            CategoryId = miscellaneousItems.Id,
            Category = miscellaneousItems,
            Price = 16.19m,
            OldPrice = null,
            AvailableQuantity = 7,
          },
        };

      Products.AddRange(productList);
    }

    public IEnumerable<Product> GetProducts()
    {
      return Products;
    }

    public Product GetProductById(Guid id)
    {
      return Products.FirstOrDefault(s => s.Id == id);
    }

    public bool UpdateProduct(Product product)
    {
      var updatingProduct = Products.FirstOrDefault(s => s.Id == product.Id);
      if (updatingProduct == null)
      {
        return false;
      }
      updatingProduct.AvailableQuantity = product.AvailableQuantity;
      return true;
    }
  }
}