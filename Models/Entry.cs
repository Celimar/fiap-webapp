using System.ComponentModel.DataAnnotations;
using wealthy.Extensions;

namespace pwapi.Models
{
    public class Entry
    {
        [Key]
        public int Id { get; set; }

//        [MaxLength(60, ErrorMessage = "A descrição do lançamento deve ter de 3 a 60 caracteres")]
//        [MinLength(3, ErrorMessage = "A descrição do lançamentodeve ter de 3 a 60 caracteres")]
        public string Description { get; set; }

//        [Range(1, 4, ErrorMessage = "Invalue Value")]
        public EntryCategory Category { get; set; }

        public string CategoryDescription { get {return EnumExtensionMethods.GetEnumDescription(Category) ;} }

//        [Range(0.01, decimal.MaxValue, ErrorMessage = "Invalue Value")]
        public decimal Value { get; set; }

        public decimal Total{ get; set; }

        
        public System.DateTime Date { get; set; }
        public double Latitude { get; set; }        
        public double Longitude { get; set; }   

        public string Link { get;  }    
        
    }

    
}