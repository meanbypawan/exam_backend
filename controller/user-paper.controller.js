import { Question } from "../model/question.model.js";
import { UserPaper } from "../model/user-paper.model.js";
import { User } from '../model/user.model.js';
export const submitTest = async (request, response, next) => {
  let { questionList, userId } = request.body;
  let currentUserPaper = await UserPaper.findOne({ userId: userId });
  let currentUserQuestionsList = currentUserPaper.questionsList;
  let score = 0;
  for (let key in questionList) {
    for (let question of questionList[key]) {
      let index = currentUserQuestionsList[0][key].findIndex((dbQuestion) => { return dbQuestion.Id == question.Id });
      currentUserQuestionsList[0][key][index].AnswerKey = question.AnswerKey;
      console.log(key + " " + currentUserQuestionsList[0][key][index].Answer + "  " + question.AnswerKey);
      if (question.AnswerKey == currentUserQuestionsList[0][key][index].Answer)
        score++;
    }
  }
  currentUserPaper.questionList = null;
  currentUserPaper.questionsList = currentUserQuestionsList;
  await UserPaper.updateOne({ userId: userId }, { questionsList: currentUserQuestionsList });
  await User.updateOne({ _id: userId }, { examStatus: true, score });
  return response.status(200).json({ "score": score });
}
export const generateQuestionPaper = async (request, response, next) => {
  try {
    const userId = request.body.userId;
    let user = await UserPaper.findOne({ userId: userId });
    if (!user) {
      let hindiQuestions = await getRandomQuestionByCategory("Hindi", 10);
      let englishQuestions = await getRandomQuestionByCategory("English", 10);
      let gkQuestions = await getRandomQuestionByCategory("General Knowledge", 10);
      let basicComputerQuestions = await getRandomQuestionByCategory("Computer Basic", 10);
      let logicalResoningQuestion = await getRandomQuestionByCategory("Logical Resoning", 30);
      let aptitudeQuestions = await getRandomQuestionByCategory("Quantitative Aptitude", 30);
      let paper = new UserPaper({ userId: userId, questionsList: [{ "English": englishQuestions, "Hindi": hindiQuestions, "General Knowledge": gkQuestions, "Computer Basic": basicComputerQuestions, "Quantitative Aptitude": aptitudeQuestions, "Logical Resoning": logicalResoningQuestion }] });
      await paper.save();
      return response.status(200).json(paper.toJSON());
    }
    else
      return response.status(200).json(user);
  }
  catch (err) {
    return response.status(500).json({ error: "Server Error" });
  }
}

const getRandomQuestionByCategory = async (category, limit) => {
  try {
    const randomQuestions = await Question.aggregate([
      { $match: { Category: category } }, // Filter by category
      { $sample: { size: limit } } // Retrieve a random document from the filtered results
    ]);
    return randomQuestions; // Return the first (and only) result from the array
  } catch (error) {
    console.error('Error fetching random Questions:', error);
    throw error;
  }
}
