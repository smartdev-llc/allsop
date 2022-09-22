using System.Collections.Generic;

namespace AllSop.Promotions
{
  public class CodePromotionRepository : ICodePromotionRepository
  {
    public List<string> GetPromotionCodes()
    {
      return new List<string>()
      {
        "20OFFPROMO"
      };
    }
  }
}