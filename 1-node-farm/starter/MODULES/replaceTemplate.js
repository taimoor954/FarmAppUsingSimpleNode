//created this function to replace all placeholder in template overview html 


module.exports = (temp, product) => {
    let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName) //used RE to replace all 
    output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image)
    output = output.replace(/{%PRODUCT_PRICE%}/g, product.price)
    output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity)
    output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients)
    output = output.replace(/{%PRODUCT_FROM%}/g, product.from)
    output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description)
    output = output.replace(/{%PRODUCT_ID%}/g, product.id)
    if(!product.organic)
    {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic') //CSS CLASS IN TEMP PRODUCT
    }
    return output
}
//no name so anonaymous func
