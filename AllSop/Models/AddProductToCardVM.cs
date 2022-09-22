using System;

namespace AllSop.Models
{
  public class AddProductToCardVM
  {
    public Guid CartId { get; set; }
    public Guid ProductId { get; set; }
  }
}