const mysql = require('mysql')
const inquirer = require('inquirer')

const connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
})
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}
connection.connect(function(err) {
    if (err) {
        throw err
    }
    console.log('ID: ' + connection.threadId)
})

function buyIt() {

	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id
		var quantity = input.quantity

		var queryStr = 'SELECT * FROM products WHERE ?'

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				allProducts()

			} else {
				var productData = data[0]

				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you requested is in stock! Placing order!')
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err

						console.log('Your oder has been placed! Your total is $' + productData.price * quantity)
						console.log('Thank you for shopping with us!')
						console.log("\n---------------------------------------------------------------------\n")
						connection.end()
					})
				} else {
					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.')
					console.log('Please modify your order.')
					console.log("\n---------------------------------------------------------------------\n")

					allProducts()
				}
			}
		})
	})
}

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

	  	buyIt()
	})
}

function runBamazon() {
	allProducts()
}
runBamazon()
