class AppHelper {

    // string capitalize
    static stringCapitalize = (str: string) => {
        // split the above string into an array of strings 
        // whenever a blank space is encountered
        const arr = str.split(" ");

        // loop through each element of the array and capitalize the first letter.
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }

        // Join all the elements of the array back into a string 
        // using a blankspace as a separator 
        return arr.join(" ");
    };

    // sort array
    static sortArray = (array: any, key: string) => {
        return array.sort((a: any, b: any) => a[key] > b[key] ? 1 : -1);
    };
};

export default AppHelper;