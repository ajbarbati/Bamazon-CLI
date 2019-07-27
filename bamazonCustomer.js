const mysql = require('mysql')
const inquirer = require('inquirer')

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

function allProducts() {
	queryStr = 'SELECT * FROM products'

	connection.query(queryStr, function(err, data) {
		if (err) throw err

		console.log('What we got: ')
		console.log('...................\n')

		const strOut = ''
		for (const i = 0; i < data.length; i++) {
			strOut = ''
			strOut += 'Item ID: ' + data[i].item_id + '  //  '
			strOut += 'Product Name: ' + data[i].product_name + '  //  '
			strOut += 'Department: ' + data[i].department_name + '  //  '
			strOut += 'Price: $' + data[i].price + '\n'

			console.log(strOut)
		}

	  	console.log("---------------------------------------------------------------------\n")

	  	buyProduct()
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
  

