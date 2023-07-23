const { MongoClient } = require('mongodb');

async function createDatabaseAndCollections() {
  try {
    // Connection URL and database name
    const uri = 'mongodb://localhost:27017'; 
    const dbName = 'codingMentorshipDB'; 

    // Create a new MongoClient
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    // Connect to the MongoDB server
    await client.connect();

    // Get the reference to the database
    const db = client.db(dbName);

    // Array of sample documents for each collection
    const sampleDocuments = [
      {
        title: "Async Case",
        code: `// Task: Create an asynchronous function called 'fetchAndProcessData'.
        // This function should fetch data from the given URL using the 'fetch' API.
        // Then, it should wait for the data to be fetched and parsed into JSON.
        // Once the data is available, log it to the console.
        
        // You need to implement the 'fetchAndProcessData' function below:
        
        async function fetchAndProcessData(url) {
          try {
            // Step 1: Use the 'fetch' API to fetch data from the provided 'url'.
            // Hint: Use the 'await' keyword to wait for the fetch to complete.
        
            // Step 2: Check if the response is not 'ok' (status code not in the 200 range).
            // If it's not, throw an error with the message 'Failed to fetch data'.
        
            // Step 3: Parse the response body as JSON using the 'json' method of the response object.
            // Hint: Use the 'await' keyword to wait for the parsing to complete.
        
            // Step 4: Log the parsed JSON data to the console.
        
          } catch (error) {
            // Step 5: In case of an error (e.g., failed fetch or JSON parsing error),
            // log the error message to the console.
          }
        }
        // Test your function with a sample URL
        const sampleUrl = 'https://api.example.com/data'; // Replace with the actual API URL
        fetchAndProcessData(sampleUrl);`,
      },
      {
        title: "Array Manipulation",
        code: `// Define the function named doubleArray that takes an array as input
        function doubleArray(arr) {
          // Create an empty array to store the doubled elements
          let doubledArr = [];
        
          // Iterate through each element of the input array
          for (let i = 0; i < arr.length; i++) {
            // Complete the code: double the current element and push it to the doubledArr
            doubledArr.push(arr[i] * 2);
          }
        
          // Return the doubled array
          return doubledArr;
        }
        
        // Test the function
        const inputArray = [1, 2, 3, 4, 5];
        const result = doubleArray(inputArray);
        console.log(result); // Output: [2, 4, 6, 8, 10]
        `,
      },
      {
        title: "Object Oriented Programming",
        code: `// Define the class Person
        class Person {
          // Constructor to initialize name and age properties
          constructor(name, age) {
            this.name = name;
            this.age = age;
          }
        
          // Complete the code: Define a method named "introduce" that returns a string
          // introducing the person with their name and age. For example, "Hi, I'm John and I'm 25 years old."
          introduce() {
            return "Hi, I'm ${this.name} and I'm ${this.age} years old.";
          }
        }
      
        // Create an instance of the Person class
        const person1 = new Person("John", 25);
        
        // Call the introduce method and print the output
        console.log(person1.introduce()); // Output: "Hi, I'm John and I'm 25 years old."`,
      },
      {
        title: "Recursion Examples",
        code: `// Complete the code: Define the recursive function sumOfDigits
        function sumOfDigits(number) {
          // Base case: Check if the number is a single digit (less than 10)
          if (number < 10) {
            return number; // Return the number itself, as there is no need to sum its digits
          } else {
            // Recursive case: Calculate the sum of digits by adding the last digit
            // (number % 10) to the sumOfDigits of the remaining digits (Math.floor(number / 10)).
            return number % 10 + sumOfDigits(Math.floor(number / 10));
          }
        }
        
        // Test the function
        const num = 12345;
        console.log(sumOfDigits(num)); // Output: 15 (1 + 2 + 3 + 4 + 5 = 15)
        `,
      },
    ];

    // Create collections and insert documents
    for (const document of sampleDocuments) {
      const collectionName = document.title.toLowerCase().replace(/\s/g, ''); // Use the title as the collection name
      const collection = db.collection(collectionName);
      const result = await collection.insertOne(document);
      console.log(`Document inserted in collection ${collectionName} with ID:`, result.insertedId);
    }

    // Close the connection
    client.close();
  } catch (error) {
    console.error('Error creating the database and collections:', error);
  }
}

// Call the function to create the database and collections
createDatabaseAndCollections();
