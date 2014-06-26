exports.transform = function (data) {
    console.log("## transform data element.");
    console.log(data);

    data.$test = true;

    return data;
};