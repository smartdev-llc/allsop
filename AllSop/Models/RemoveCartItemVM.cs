using System;

namespace AllSop.Models
{
  public class RemoveCartItemVM
  {
    public Guid CartId { get; set; }
    public Guid CartItemId { get; set; }
  }
}