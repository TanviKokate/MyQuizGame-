class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }
  play(){
    question.hide();
    
    background("yellow");

    stroke(255);
    strokeWeight(2);
    fill(0);
    textSize(35);
    text("Result of the Quiz", 280, 50);
 
    Contestant.getContestantInfo();
    
    if (allContestants !== undefined){
      var display_Answers = 230;

      fill("blue");
      noStroke();
      text("Note : Contestants who answered correct are highlited in Green Colour", 280, 380)

    for(var plr in allContestants){
      var correct_Answer = "2";
      if (correct_Answer === allContestants[plr].answer)
         fill("green");
      else 
         fill(255, 0, 0);
      
      display_Answers += 30;

      textSize(30);  
      text(allContestants[plr].name + ": " + allContestants[plr].answer, 250, display_Answers);
    }
   } 
  }
}