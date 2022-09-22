using System.Collections.Generic;

namespace AllSop.Promotions
{
  public interface IPromotionProvider
  {
    List<IPromotion> GetPromotions();
  }
}
