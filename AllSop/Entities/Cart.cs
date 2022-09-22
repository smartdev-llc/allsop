using System;
using System.Collections.Generic;
using System.Linq;
using AllSop.Promotions;

namespace AllSop.Entities
{
  public class Cart
  {
    public Guid Id { get; set; }
    public List<CartItem> CartItems { get; set; } = new List<CartItem>();
    public decimal Total => CartItems.Sum(i => i.Product.Price * i.Quantity);
    public decimal ReducedTotal => Total - Promotions.Sum(p => p.ReducedTotal);
    public List<Promotion> Promotions { get; set; } = new List<Promotion>();
    public string PromotionCode { get; set; }

    public void CalculatePromotion(List<IPromotion> promotions)
    {
      Promotions = promotions.Select(p => new Promotion()
      {
        ReducedTotal = p.GetReducedTotal(this),
        Name = p.Name,
      }).ToList();
    }
  }
}