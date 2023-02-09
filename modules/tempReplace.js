module.exports = function(template, product) { 
    let output = template.replace(/{%title%}/g, product.title);
    output = output.replace(/{%brand%}/g, product.brand);/*  */
    output = output.replace(/{%category%}/g, product.category);/*  */
    output = output.replace(/{%thumbnail%}/g, product.thumbnail);/*  */

    return output;
}