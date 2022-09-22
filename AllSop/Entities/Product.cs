using System;

namespace AllSop.Entities
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal? OldPrice { get; set; }
        public decimal Price { get; set; }
        public int AvailableQuantity { get; set; }
        public Category Category { get; set; }
        public Guid CategoryId { get; set; }
    }
}