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

// Variable Used to Display Each Item In Array
var i = -1;

// Game Function

$(document).ready(function(){

// Start Button Click Will Begin Quiz Functions
$(document).on('click', "#start", function (start){ 
        $('#timer').text(' 00 : 10')
        $('#quiz').css('margin-top',"0px");
        $('#start').remove();


    //Main Game Function 
    function generateQuiz (questions,quizContainer, resultsContainer) {


        // Function That Generates Questions and Answers; Displays to HTML   
        function showQuestions (questions, quizContainer) {
            var output = [];
            var answers = [];
            var userAnswer = '';
            var numCorrect = 0;
            i++;

            $("#quiz").on('click', function() {
                var userAnswer = $('input[name=question'+i+']:checked').val();
                clearInterval(timer);

                if (userAnswer === questions[i].correctAnswer){ 
                    console.log('Right'); 
                    numCorrect++;
                    quizContainer.innerHTML = '<p id="over">Correct! <br>' + numCorrect + ' out of ' + questions.length + '</p>';
                    $('#quiz').css('margin-top',"250px");
                } else {
                    console.log('Wrong!');
                    quizContainer.innerHTML = '<p id="over">Wrong! <br>' + numCorrect + ' out of ' + questions.length + '</p>';
                    $('#quiz').css('margin-top',"250px");
                };
            });



            //     // Creates Multiple Choice Answers From Object
                for (letter in questions[i].answers) {
                    answers.push('<input type="radio" name="question'+i+'" value="'+letter+'">'+ questions[i].answers[letter] + '</label>');
                }
                output.push('<div class ="question">' + questions[i].question + '</div>' + '<div class="answers">' + answers.join('') + '</div>');
            // // Display to HTML
            quizContainer.innerHTML = output.join('');             
        }

        // Calls Function To Create Quiz
                // Variables and setInterval for Timer
                var min = '00';
                var sec = '10';
                showQuestions(questions, quizContainer)
                var timer = setInterval(function(){
                    
                    
                    $("#timer").html(min + " : " + sec); 
                    sec--;
                    console.log(sec)
        
                    // If Times Runs Out, Game Over
                    if (sec < 0) {
                      $("#timer").html("00:00");
                        // clearInterval(timer);
                        alert("Time's Up!");
                        showQuestions(questions,quizContainer);
                        sec = '10';

                    } else if (sec < 10) {
                        sec = '0' + sec;
                        }
                    }, 1000);   
    }

// Grabs Elements From HTML for Functions
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');


// Calls The Quiz Function
generateQuiz(myQuestions, quizContainer, resultsContainer);

});
});