const Department = require('../model/department');

const deptController = {
   async create(req, res){
       const name = req.body.name.toLowerCase();
       const description = req.body.description;
       try{
           const dept = await Department.findOne({name});
           if(dept)
            return res.status(201).send({dept})
      
           const newDept = await Department.create({name, description});
           res.status(201).send({newDept})
       }catch(err){
           res.status(500).send(err)
       }
   },
   async getDepts(req, res){
       try{
           depts = await Department.find({});
           res.status(200).send({depts})
       }catch(err){
           res.status(400).send(err)
       }
   },
   async updateDept(req, res){
       const[deptId] = req.params;
       const[name, description] = req.body;
       try{
           const updatedDept = await Department.findByIdAndUpdate(deptId, {$set: {name, description}});
           res.status(200).send({updatedDept})
       }catch(err){
           res.status(400).send(err)
       }
   }
}
module.exports = deptController;