import { validationResult } from "express-validator"
import { Exam } from "../model/exam.model.js"
import { User } from "../model/user.model.js";

export const changeStatus = (request, response, next) => {
    let { code, status } = request.body;
    Exam.updateMany({ code }, { status })
        .then(result => {
            return response.status(200).json({ message: "Exam status changed.." });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error" });
        });
}
export const generatePassword = async (request, response, next) => {
    try {
        let { code } = request.body;
        let password = generateRandomString();
        await User.updateMany({ code }, { password });
        return response.status(200).json({ message: "Password generated successfully" });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}
export const removeExam = (request, response, next) => {
    Exam.deleteOne({ _id: request.body.id })
        .then(result => {
            return response.status(200).json({ result });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error" });
        });
}
export const examList = (request, response, next) => {
    Exam.find()
        .then(result => {
            return response.status(200).json({ result });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error" });
        });
}
export const examCodeList = (request, response, next) => {
    const todayUTC = new Date();
    todayUTC.setUTCHours(0, 0, 0, 0);
    Exam.find({
        schedule_date: { $gte: todayUTC }
    }).then(result => {
            return response.status(200).json(result);
    }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error" });
    });
}
export const createExam = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ error: "please enter exam code" });

    let { code, schedule_date } = request.body;

    if (code.toUpperCase().includes("ITEP-")) {
        let isExist = await Exam.findOne({ code });
        if (isExist)
            return response.status(200).json({ message: "Exam code is already taken" });

        const examDate = new Date(schedule_date);
        examDate.setUTCHours(0, 0, 0, 0);

        Exam.create({ code, status: "Close", schedule_date: examDate })
            .then(result => {
                return response.status(201).json({ message: "Exam created successfully.." });
            }).catch(err => {
                return response.status(500).json({ error: "Internal server error" });
            });
    }
    else
        return response.status(400).json({ error: "Exam code missing 'ITEP-' prefix" });
}

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ$@-0123456789';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }
    return randomString;
}