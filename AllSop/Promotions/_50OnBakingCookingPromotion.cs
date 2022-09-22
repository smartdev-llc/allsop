using System.Linq;
using AllSop.Entities;

namespace AllSop.Promotions
{
  public class _50OnBakingCookingPromotion : IPromotion
  {
    public string Name => "£5.00 off your order when spending £50.00 or more on Baking/Cooking Ingredients";

    public decimal GetReducedTotal(Cart cart)
    {
      // get all drink in cart
      var items = cart.CartItems.Where(s => s.Product.Category.Name == "Baking/Cooking Ingredients").ToList();
      // total
      var total = items.Sum(s => s.Quantity * s.Product.Price);
      return total < 50 ? 0 : 5;
    }
  }
}