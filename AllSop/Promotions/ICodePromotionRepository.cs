using System.Collections.Generic;

namespace AllSop.Promotions
{
  public interface ICodePromotionRepository
  {
    List<string> GetPromotionCodes();
  }
}
