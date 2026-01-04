namespace HIMS.Models
{
    public class Patinet
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string code { get; set; }
        public double amount { get; set; }

        public List<Address> Addresses { get; set; }
    }
    public class Address
    {
        public int Id { get; set; }
        public string street1 { get; set; }
    }
}
