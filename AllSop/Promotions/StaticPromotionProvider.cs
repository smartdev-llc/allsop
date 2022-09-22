using System.Collections.Generic;

namespace AllSop.Promotions
{
  public class StaticPromotionProvider : IPromotionProvider
  {
    public List<IPromotion> GetPromotions()
    {
      return new List<IPromotion>()
      {
        new CodePromotion(),
        new _10PercentsBulkDrinkPromotion(),
        new _50OnBakingCookingPromotion(),
      };
    }
  }
}