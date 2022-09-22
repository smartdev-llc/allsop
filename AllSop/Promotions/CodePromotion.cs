using AllSop.Entities;

namespace AllSop.Promotions
{
  public class CodePromotion : IPromotion
  {
    public string Code { get; private set; }
    public string Name => $"Promotion code {Code}";

    public decimal GetReducedTotal(Cart cart)
    {
      switch (cart.PromotionCode)
      {
        case "20OFFPROMO":
          Code = cart.PromotionCode;
          return cart.Total >= 100 ? 20 : 0;
        default:
          return 0;
      }
    }
  }
}