import express from 'express';

const app =express();

app.get('/api/products', (req, res) =>{

    const products = [
        {
           id:1,
           name: 'table wooden',
           price: 200
        },
        {
            id:2,
            name: 'table plastic',
            price: 300
         },
         {
            id:3,
            name: 'table wooden',
            price: 500
         },
         {
            id:4,
            name: 'table plastic',
            price: 350
         },
         {
            id:5,
            name: 'Cricket bat',
            price: 5000
         }
    ]


    if (req.query.search){

        const filtered_products = products.filter( product => product.name.includes(req.query.search));
        res.send(filtered_products);

        return;
    }
    setTimeout(() =>{

        res.send(products);
    },3000);
})
const port= process.env.PORT || 3000;


app.listen(port, () => {

    console.log(`Server running on port ${port}`);
});