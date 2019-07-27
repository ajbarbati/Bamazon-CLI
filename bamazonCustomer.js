const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
})

connection.connect(function(err) {
    if (err) {
        throw err
    }
    console.log('ID: ' + connection.threadId)
})

// connection.query('SELECT * FROM products', (err, rows) => {
//     if (err) {
//         throw err
//     }
//     console.log('Data Returned')
//     console.log(rows)
  
//   });
// })

function allProducts() {
    console.log('-- ALL PRODUCTS --')
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) {
            throw err
        }
        console.log(res)
        connection.end()
    })
}

allProducts()
  connection.forEach( (row) => {
    console.log(`${row.product_name} is in ${row.department_name}`)
})

function buyProduct () {
    console.log('What is the ID of the product you would like to purchase?')
    
    console.log('How many units would you like?')
}
function quantityCheck () {
    if (quantity === 0) {
        console.log('All out!')
        allProducts()
    } else checkOut()
}

function checkOut () {
    console.log("Grabbing your product from the back");
    connection.query(
      "DELETE FROM products WHERE ?",
      {
        row
      },
      function(err, res) {
        if (err) {
            throw err
        } 
        console.log(res.affectedRows + " All set!")
        allProducts()
      }
    );
  }
  

