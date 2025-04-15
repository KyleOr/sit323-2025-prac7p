const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Function to add two numbers
const add = (n1, n2) => {
    return n1 + n2; // Return the sum of n1 and n2
};

// Function to subtract two numbers
const subtract = (n1, n2) => {
    return n1 - n2; // Return the difference of n1 and n2
};

// Function to multiply two numbers
const multiply = (n1, n2) => {
    return n1 * n2; // Return the product of n1 and n2
};

// Function to divide two numbers
const divide = (n1, n2) => {
    if (n2 === 0) throw new Error('Division by zero is not allowed'); // Check for division by zero
    return n1 / n2; // Return the quotient of n1 and n2
};

// Function to calculate the exponentiation of two numbers
const exponentiate = (n1, n2) => {
    return Math.pow(n1, n2); // Return n1 raised to the power of n2
};

// Function to calculate the square root of a number
const sqrt = (n1) => {
    if (n1 < 0) throw new Error('Square root of negative number is not allowed'); // Check for negative number
    return Math.sqrt(n1); // Return the square root of n1
};

// Function to calculate the modulo of two numbers
const modulo = (n1, n2) => {
    return n1 % n2; // Return the remainder of n1 divided by n2
};


// Endpoint for different operations
app.get('/:operation', (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1); // Parse n1 from query
        const n2 = req.query.n2 !== undefined ? parseFloat(req.query.n2) : undefined; // Parse n2 from query if it exists

        if (isNaN(n1)) { // Check if n1 is a number
            throw new Error('n1 incorrectly defined'); // Throw error if n1 is not a number
        }
        if (n2 !== undefined && isNaN(n2)) { // Check if n2 is a number if it exists
            throw new Error('n2 incorrectly defined'); // Throw error if n2 is not a number
        }

        let result;
        switch (req.params.operation) {
            case 'add':
                result = add(n1, n2); // Call add function
                break;
            case 'subtract':
                result = subtract(n1, n2); // Call subtract function
                break;
            case 'multiply':
                result = multiply(n1, n2); // Call multiply function
                break;
            case 'divide':
                result = divide(n1, n2); // Call divide function
                break;
            case 'exponentiate':
                result = exponentiate(n1, n2); // Call exponentiate function
                break;
            case 'sqrt':
                result = sqrt(n1); // Call sqrt function
                break;
            case 'modulo':
                result = modulo(n1, n2); // Call modulo function
                break;
            default:
                throw new Error('Invalid operation'); // Throw error if operation is invalid
        }

        res.status(200).json({ statuscode: 200, data: result }); // Return result
    } catch (error) {
        console.log(error); // Log error
        res.status(500).json({ statuscode: 500, msg: error.toString() }); // Return error response
    }
});

// Handle invalid routes
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).json({ statuscode: 500, msg: err.message }); // Return error message
});

// Start the server
const PORT = process.env.PORT || 3000; // Set port
app.listen(PORT, () => {
    console.log(`Calculator microservice running on port ${PORT}`); // Start server
});