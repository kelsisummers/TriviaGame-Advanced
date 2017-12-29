// Object Holding Questions, Answers, and Correct Answer

var myQuestions = [
    // Question 1
    {question: "What is currently the most popular craft beer style in America?",
    answers: {a:'lager', b: 'ale', c: 'stout', d: 'IPA'},
    correctAnswer: 'd'},
    // Question 2
    {question: "As of early 2016, how many craft breweries are there in the United States?",
    answers: {a: '4,269', b: '2,156', c: '5,720', d: '3,568'},
    correctAnswer: 'a'},
    // Question 3
    {question: "By volume, small and independent brewers make up approximately what share of the U.S. beer market?",
    answers: {a: '5%', b: '12%', c: '22%', d: '36%'},
    correctAnswer: 'b'},
    // Question 4
    {question: "Which company is the largest craft brewer in the United States?",
    answers: {a: 'New Belgium Brewery', b: 'Boston Beer Co.', c: 'Yuengling', d: 'Dogfish Head'},
    correctAnswer: 'c'},
    // Question 5
    {question: "To be considered a microbrewery, a brewery's production cannot exceed what?",
    answers: {a: '5,000 barrels', b: '15,000 barrels', c: '20,000 barrels', d: '50,000 barrels'},
    correctAnswer: 'b'},
    // Question 6
    {question: 'The majority of the market for craft beers falls into which age range?',
    answers: {a:'35 to 49', b: '24 to 29', c: '21 to 27', d: '42 to 51'},
    correctAnswer: 'a'},
    // Question 7
    {question: "How do sour beers get their unique flavor?",
    answers: {a: 'Spirillum', b: 'Cyanobacteria', c: 'Streptococcus', d: 'Lactobacillus'},
    correctAnswer: 'd'},
    // Question 8
    {question: 'Why does Dogfish Head Brewery call one of its beers a "90 minutes IPA?"',
    answers: {a: 'You can only drink one every 90 minutes.', b: 'It took the brewers 90 minutes to develop the recipe.', c: 'The hops are boiled for 90 minutes.', d: '"60 Minute" was already taken.'},
    correctAnswer: 'c'},
    // Question 9
    {question: 'Which state ranks first in terms of breweries per capita?',
    answers: {a: 'North Carolina', b: 'Colorado', c: 'Vermont', d: 'Oregon'},
    correctAnswer: 'c'},
    // Question 10
    {question: 'What is a trait that defines the brewing process for ales?',
    answers: {a: 'lower quantities of yeast', b: 'warm fermentation', c: 'lots of refined sugar', d: 'aged in oak barrels'},
    correctAnswer: 'b'},
];

// Game Function

$(document).ready(function(){

// Start Button Click Will Begin Quiz Functions
$(document).on('click', "#start", function (start){ 
        $('#timer').text(' 01 : 30')
        $('#quiz').css('margin-top',"0px");
        $('#start').remove();
        $('#results').prepend('<button id="submit" type="button" class="start btn btn-light">Get Results</button>')

    //Main Game Function 
    function generateQuiz (questions,quizContainer, resultsContainer,submitButton) {

        // Variables and setInterval for Timer
        var min = '01';
        var sec = '29';
        var timer = setInterval(function(){
            $("#timer").html(min + " : " + sec); 
            sec--;

            // If Times Runs Out, Game Over
            if (min == 00 && sec == 00) {
              $("#timer").html("00:00");
                clearInterval(timer);
                alert("Time's Up!");
                showResults(questions,quizContainer,resultsContainer);

            // Otherwise Countdown Continues
            } else if (sec < 10) {
                sec = '0' + sec;
                    if (sec == 00) {
                        min--;
                        sec = 59;
                      if (min == 00) {
                          min = '00';
                        }
                    }
                }
            }, 1000);

        // Function That Generates Questions and Answers; Displays to HTML   
        function showQuestions (questions, quizContainer) {
            var output = [];
            var answers;

            // Loops Over Questions Array To Create Quiz
            for (var i = 0; i < questions.length; i++) {
                answers =[];

                // Creates Multiple Choice Answers From Object
                for (letter in questions[i].answers) {
                    answers.push('<input type="radio" name="question'+i+'" value="'+letter+'">'+ questions[i].answers[letter] + '</label>');
                }
                output.push('<div class ="question">' + questions[i].question + '</div>' + '<div class="answers">' + answers.join('') + '</div>');     
            }
            // Display to HTML
            quizContainer.innerHTML = output.join('');           
        }

        // Game Over Function That Determines Correct Answers; Displays Restuls
        function showResults (questions, quizContainer, resultsContainer) {
            var answersContainers = quizContainer.querySelectorAll('.answers');
            var userAnswer = '';
            var numCorrect = 0;
        
                for(var i = 0; i < questions.length; i++) {

                    // Grabs The Users Input For Each Questions
                    userAnswer = (answersContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
                    
                    // If User's Choice Is Correct, Increase Score
                    if (userAnswer === questions[i].correctAnswer){
                        numCorrect++;
                    };
                }
                
                // Game Over Page With Results
                quizContainer.innerHTML = '<p id="over">Game Over <br>' + numCorrect + ' out of ' + questions.length + '</p>';
                $('#quiz').css('margin-top',"250px");
                $('#submit').remove();
                $('#results').prepend('<button id="start" type="button" class="btn btn-light" style="margin-top:10px">Play Again?</button>')
        
        }

        // Calls Function To Create Quiz
        showQuestions(questions, quizContainer)

        // Creates Submit Button That Ends Quiz
        submitButton.onclick = function(submit) {
            showResults(questions,quizContainer,resultsContainer);
            clearInterval(timer);
        }           
    }

// Grabs Elements From HTML for Functions
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

// Calls The Quiz Function
generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

});
});