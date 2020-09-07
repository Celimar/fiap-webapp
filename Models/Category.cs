
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace pwapi.Models 
{
    public enum EntryCategory: byte
    {

        [Description("Fixed Expenses")]
        FixedExpense = 1, 
        
        [Description("Variable Expenses")]
        VariableExpense = 2,

        [Description("Fixed Income")]
        FixedIncome = 3, 

        [Description("Variable Income")]
        VariableIncome = 4

    }

}