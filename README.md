# questionPaperGenerator

This repository contains the implementation of a Question Paper Generator application in Node. The application is designed to store a set of questions in a Question Store and generate question papers based on specified criteria such as total marks and the distribution of marks based on difficulty levels.

## Setup

## 1. Clone this repository: 
https://github.com/AbhinavRai2004/questionPaperGenerator.git

## 2.Navigate to the project directory through terminal/powershell/bash: 
    Step 1 - cd questionPaperGenerator
    Step 2 - cd server
    
## 3.Install dependencies:
    npm install

## Running the Application

## Step 1 : Run the following command on terminal
            node server.js
## Step 2 : Hit the below API on postman with request body
           http://localhost:8080/generate_question_paper
        
           Body ->
                {
                "totalMarks" : 100,
                "easy" : 20,
                "medium" : 50,
                "hard" : 30
                }
  
## Conclusion
Thank you for reviewing the Question Paper Generator application. If you have any questions or feedback, please feel free to reach out. Happy coding!

Author: Abhinav Rai

Contact: raiabhinav.in@gmail.com
