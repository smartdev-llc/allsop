using AllSop.Entities;

namespace AllSop.Promotions
{
  public interface IPromotion
  {
    string Name { get; }
    decimal GetReducedTotal(Cart cart);
  }
}
