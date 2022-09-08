// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodosContract {

  // events to trigger whenever any user attempts to add or delete the task. this event will be emitted and will be sent to frontend to show and notify the user
  
  event event_add_task(address receiptient, uint _id);
  event event_delete_task(uint _id, bool is_deleted);

  // here structs to store or indicate the type of the todo tasks object. just like in the typescript
  
  struct Task{
   uint id;
   string task_text;
   bool is_deleted;
  }

  // tasks array which will store only the Task type(structure) of objects. since it is private so it can only be accessed inside this contract only
  
  Task[] private tasks;

  // mapping is just like objects which have key value pair, here I 
  // am using this to differentiate the users, everytime a task is added, its task_id will be stored in mapping as key and its value will be address of the sender.
  
  mapping(uint256 => address) task_to_owner;

  // add_task function which will-->
  // 1. store the task as {task_id, task_text, is_deleted} in tasks array,
  // 2. will store {task_id:sender's_address} in mapping,
  // 3. will emit the event_add_task to the frontend
  
  function add_task(string memory task_text, bool is_deleted) external{
    uint task_id=tasks.length;
    tasks.push(Task(task_id, task_text, is_deleted));
    task_to_owner[task_id] =msg.sender;
    emit event_add_task(msg.sender, task_id); 
  }


}
