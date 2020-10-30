
//hash or array?
//Profiles like institution, boy, girl etc contains no information on preference, labor, activity
export default STRINGS = {
sex : ["Male", "Female", "Infant", "Boy", "Girl", "Pregnant", "Lactating", "Institution", "General"],
preference : ["None", "Vegetarian", "Vegan", "Pescetarian"],
labor : ["None", "Bedridden/Inactive", "Sedentary Work", "Standing Work", "Physical Hard Work"],
activity : ["None", "Less Active", "Active", "Very Active"],
hours : ["0", "<2 Hours", "2-3 Hours", ">3 Hours"]
}
/*
//defines strings for preference, gender, work, freetime
//uses dicts to simplify use of sliders for selection 
export const SEX = {0:"Male",
                    1:"Female"
                    2:"Infant",
                    3:"Boy",
                    4:"Girl",
                    5:"Pregnant",
                    6:"Lactating",
                    7:"Institution",
                    8:"General"};

export const PREFERENCE ={0:"None",
                    1:"Pesceterian",
                    2:"Vegeterian",
                    3:"Vegan"};

export const LABOR = {0:"None",
                    1:"Bedridden/Inactive",
                    2:"Sedentary Work",
                    3:"Standing Work",
                    4:"Physical Hard Work"};

export const ACTIVITY = {0:"None",
                    1:"Less Active",
                    2:"Active",
                    3:"Very Active"};



//reverse lookup helper for maps
//                object   int  -> string
// getKeyByValue( workMap, work) -> "Bedridden/Inactive"
export function getKeyByValue(object, value) {
    
    var ret;

    try{
      //get key from map, parse as int
      ret = parseInt( Object.keys(object).find(key => object[key] === value) );
      // if no match use 1 as default to avoid returning undefined
      if(isNaN(ret) ){ 
          console.warn("Tried to access a non-existing key\n","Key:",value, "\nObject: ",object)
          ret = 1 }
    }
    catch (err){
      console.warn(err)
      ret = 1;
    }

    return ret    
  }

*/