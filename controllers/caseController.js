/* Create case
Get all cases
Get case by ID
Add a suspect to a case
Mark case as solved
Delete a case */

const Case = require("../models/case")
const Suspect = require("../models/suspect")

const caseController = {
    //Create case
    async createCase(req, res){
        try{
            const {title, description, location, date, status} = req.body;
            const newCase = await Case.create({title, description, location, date, status});
            res.status(201).json({message: "Case created successfully", newCase})
        }
        catch(error){
            res.status(500).json({message:"Error creating case", error:error.message})
        }
    },

    //Get all cases
    async getAllCases(req, res){
        try{
            const allCases = await Case.findAll();
            if(allCases.length === 0){
                return res.status(404).json({message: "No cases found", cases:[]})
            }
            res.status(200).json(allCases)
        }
        catch(error){
            res.status(500).json({message:"Error fetching cases", error:error.message})
        }
    },

    //Get a  case by ID
    async getCaseById(req, res){
        try{
            const caseId = req.params.id
            const foundCase = await Case.findByPk(caseId)
            if (foundCase){
                res.status(200).json({foundCase})
            }
            else{
                res.status(404).json({message: "Case not found"})
            }
        }
        catch(error){
            res.status(500).json({message:"Error fetching cases", error:error.message})
        }
    },

    //Add suspect to a case
    async addSuspect(req, res){
        try{
            const {name, age, known_aliases, last_seen_date, last_seen_location} = req.body;
            const caseId = req.params.id
            const foundCase = await Case.findByPk(caseId)
            if(!foundCase){
                res.status(404).json({message: "Case not found"})
                return;
            }
            if (!name || !age || !known_aliases || !last_seen_date || !last_seen_location) {
                return res.status(400).json({ message: "Missing required suspect info" });
            }
            
            const newSuspect = await Suspect.create({name, age, known_aliases, last_seen_date, last_seen_location, case_id: caseId})
            res.status(201).json({message: "Suspect added successfully", newSuspect})
        }
        catch(error){
            res.status(500).json({message:"Error adding suspect", error:error.message})
        }
    },

    //Mark case as solved
    async markCaseAsSolved(req, res){
        try{
            const caseId = req.params.id;
        const foundCase = await Case.findByPk(caseId)
        if(!foundCase){
            return res.status(404).json({message: "Case not found"})
        }
        foundCase.status = "Solved";
        await foundCase.save();
        res.status(200).json({message: "Case successfully marked as found", foundCase})
    }
    catch(error){
        res.status(500).json({message:"Error creating case", error:error.message})
    }
    },


    //Update case
    

    //Delete a case
    async deleteCase(req, res){
        try{
            const caseId = req.params.id;
        const foundCase = await Case.findByPk(caseId)
        if(!foundCase){
            return res.status(404).json({message: "Case not found"})
        }
        await foundCase.destroy()
        res.status(200).json({message: "Case successfully deleted", foundCase})
    }
    catch(error){
        res.status(500).json({message:"Error creating case", error:error.message})
    }
    },

}

module.exports = caseController
