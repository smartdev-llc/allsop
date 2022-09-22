using System.Linq;
using AllSop.Entities;

namespace AllSop.Promotions
{
  public class _10PercentsBulkDrinkPromotion : IPromotion
  {
    public string Name => "Get 10% off bulk drinks – any drinks are 10% off the listed price (including already reduced items) when buying 10 or more";

    public decimal GetReducedTotal(Cart cart)
    {
      // get all drinks in cart that more than 10
      var drinks = cart.CartItems.Where(s => s.Product.Category.Name == "Drinks" && s.Quantity >= 10).ToList();
      if (!drinks.Any())
      {
        return 0;
      }

      // Get 10% off the listed price
      var reducedAmount = drinks.Sum(s => s.Quantity * (s.Product.OldPrice ?? s.Product.Price) * 0.1m);
      return reducedAmount;
    }
  }
}