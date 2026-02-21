import path from "path";
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';
import { Question } from "../model/question.model.js";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const uploadQuestion = async (request,response,next)=>{
  try{
  const filePath = path.join(__dirname,'../',request.file.path); 
  const workbook = xlsx.readFile(filePath);
  let workbook_sheet = workbook.SheetNames;                
  let workbook_response = xlsx.utils.sheet_to_json(
    workbook.Sheets[workbook_sheet[0]]
  );
  for(let question of JSON.parse(JSON.stringify(workbook_response))){
    await Question.create(question);
  }
  return response.status(200).json({message: "Question uploaded successfully"});
 }
 catch(err){
   return response.status(500).json({error: "Server Error"});
 }
}