using System;

namespace AllSop.Models
{
  public class UpdateCartItemVM
  {
    public Guid CartId { get; set; }
    public Guid CartItemId { get; set; }
    public int Quantity { get; set; }
  }
}