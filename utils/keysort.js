export default function keysort(arr, key, reverse) {
    var sortOrder = 1;
    if(reverse){
        sortOrder = -1;
    }
    return arr.sort(function(a, b) {
        var x = a[key],
            y = b[key];

        return sortOrder * ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
