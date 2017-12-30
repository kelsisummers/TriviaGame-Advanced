// Object Holding Questions, Answers, and Correct Answer
var myQuestions = [
    // Question 1
    {question: "What is currently the most popular craft beer style in America?",
    answers: {a:'lager', b: 'ale', c: 'stout', d: 'IPA'},
    correctAnswer: 'd',
    text: 'IPA'},
    // Question 2
    {question: "As of early 2016, how many craft breweries are there in the United States?",
    answers: {a: '4,269', b: '2,156', c: '5,720', d: '3,568'},
    correctAnswer: 'a',
    text: '4,269'},
    // Question 3
    {question: "By volume, small and independent brewers make up approximately what share of the U.S. beer market?",
    answers: {a: '5%', b: '12%', c: '22%', d: '36%'},
    correctAnswer: 'b',
    text: '12%'},
    // Question 4
    {question: "Which company is the largest craft brewer in the United States?",
    answers: {a: 'New Belgium Brewery', b: 'Boston Beer Co.', c: 'Yuengling', d: 'Dogfish Head'},
    correctAnswer: 'c',
    text: 'Yuengling'},
    // Question 5
    {question: "To be considered a microbrewery, a brewery's production cannot exceed what?",
    answers: {a: '5,000 barrels', b: '15,000 barrels', c: '20,000 barrels', d: '50,000 barrels'},
    correctAnswer: 'b',
    text: '15,000 barrels'},
    // Question 6
    {question: 'The majority of the market for craft beers falls into which age range?',
    answers: {a:'35 to 49', b: '24 to 29', c: '21 to 27', d: '42 to 51'},
    correctAnswer: 'a',
    text: '35 to 49'},
    // Question 7
    {question: "How do sour beers get their unique flavor?",
    answers: {a: 'Spirillum', b: 'Cyanobacteria', c: 'Streptococcus', d: 'Lactobacillus'},
    correctAnswer: 'd',
    text: 'Lactobacillus'},
    // Question 8
    {question: 'Why does Dogfish Head Brewery call one of its beers a "90 minutes IPA?"',
    answers: {a: 'You can only drink one every 90 minutes.', b: 'It took the brewers 90 minutes to develop the recipe.', c: 'The hops are boiled for 90 minutes.', d: '"60 Minute" was already taken.'},
    correctAnswer: 'c',
    text: 'The hops are boiled for 90 minutes.'},
    // Question 9
    {question: 'Which state ranks first in terms of breweries per capita?',
    answers: {a: 'North Carolina', b: 'Colorado', c: 'Vermont', d: 'Oregon'},
    correctAnswer: 'c',
    text: 'Vermont'},
    // Question 10
    {question: 'What is a trait that defines the brewing process for ales?',
    answers: {a: 'lower quantities of yeast', b: 'warm fermentation', c: 'lots of refined sugar', d: 'aged in oak barrels'},
    correctAnswer: 'b',
    text: 'warm fermentation'},
];


//Document Ready...
$(document).ready(function(){

// Start Button Click Will Begin Quiz Functions
$(document).on('click', "#start", function (start){ 

    // Variable to Determine If User Clicks Answer
    var answerClick = false;

        // Variable Used to Show Each Question
        var i = -1;

        // Score Tracker
        var numCorrect = 0;

        // Sets Timer and Removes Start Button
        $('#timer').text('00:10');
        $('#start').remove();


    //Main Game Function 
    function generateQuiz (questions,quizContainer) {

        // Function That Generates Questions and Answers; Displays to HTML   
        function showQuestions (questions, quizContainer) {
            var output = [];
            var answers = [];
            var userAnswer = '';

            // Increments i by 1 Each Time Function is Called
            i++;

            // If i is Less Than The Total Number of Questions 
            if (i < questions.length) {
                // Creates Multiple Choice Answers From Object
                for (letter in questions[i].answers) {
                    answers.push('<input type="radio" name="question'+i+'" value="'+letter+'">'+ questions[i].answers[letter] + '</label>');
                };
                // Output Displayed to HTML
                output.push('<div class ="question">' + questions[i].question + '</div>' + '<div class="answers">' + answers.join('') + '</div>');
                quizContainer.innerHTML = output.join('');  

                // When an Answer is Selected
                $('#quiz').off().on('click', "input", function() {
                    // Resets Timer to 5 Seconds on Answer Screen
                    sec = '05';
                    // Stores User Guess as Variable
                    var userAnswer = $('input[name=question'+i+']:checked').val();
                    // Hides Timer Until Next Question is Revealed
                    $("#timer").hide();

                        // If User Guess Matches Correct Answer
                        if (userAnswer === questions[i].correctAnswer){ 
                            // Increment Score by 1
                            numCorrect++;
                            // Display Result to HTML
                            quizContainer.innerHTML = '<p id="over">Correct! <br>' + numCorrect + ' out of ' + questions.length + '</p>';
                            // Troubleshoot to Console
                            console.log('Right'); 
                            console.log(sec);

                        // If user Guess is Wrong 
                        } else {
                            // Display Result to HTML
                            quizContainer.innerHTML = '<p id="over">Wrong! <br>Correct Answer:<br>' + questions[i].correctAnswer + ') ' + questions[i].text + '<br>' + numCorrect + ' out of ' + questions.length + '</p>';
                            // Troubleshoot to Console
                            console.log('Wrong!');
                            console.log(sec);
                        };
                        // Answer Has Bee Clicked
                        return answerClick = true;
                });
            
            // If i is Equal to Array Length, The Game Will End; Button to Restart Game Displays
            } else {
                clearInterval(timer);
                $('#quiz').html('<p id="over"> Game Over <br>' + numCorrect + ' out of ' + questions.length + '</p>');
                $('#quiz').append('<button id="start" type="button" class="btn btn-light">Play Again?</button>'); 
            };
        };

        // Calls Function to Show Each Question and Sets Timer
        showQuestions(questions, quizContainer)
        var min = '00';
        var sec = '10';

        // Timer Function
        var timer = setInterval(function(){
            $("#timer").html(min + ":" + sec);
            // Decrements Timer 
            sec--;
            
                // If Times Runs Out & Answer is Selected
                if (sec < 0 && answerClick === true) {
                    // Call Function to Show Next Question
                    showQuestions(questions,quizContainer);
                    // Show Timer
                    $("#timer").show();
                    // Reset answerClick Variable
                    answerClick = false;
                    // Reset Timer
                    sec = '10';
                    // Add '0' to Timer if Time < 10 Sec
                    } else if (sec < 10) {
                        sec = '0' + sec;

                    // If Time Runs Out & Answer is Not Clicked
                    } else {
                        // Hides Timer
                        $("#timer").hide();
                        // Reset Timer
                        sec = '05';
                        // Sets Variable to True for Question Function
                        answerClick = true;
                        // Calls Question Function
                        showQuestions(questions,quizContainer);
                        // Troubleshoot to Console
                        console.log('Wrong!');
                        // Display Result to HTML
                        quizContainer.innerHTML = '<p id="over">Wrong! <br>Correct Answer:<br>' + questions[i].correctAnswer + ') ' + questions[i].text + '<br>' + numCorrect + ' out of ' + questions.length + '</p>';
                    };        
        }, 1000);
    }

// Grabs Element From HTML for Functions
var quizContainer = document.getElementById('quiz');


// Calls The Quiz Function
generateQuiz(myQuestions, quizContainer);

});
});