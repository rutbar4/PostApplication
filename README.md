# linux_web_template

This is a template repository for your projects. Use this template when starting a new repository. This template can be used for Linux and Web positions in the academy. 

## Structure

This template will come with two branches and simple kaban board.

### Branches
The project by default has two branches:
* main
* development

**main** branch is used to keep your tested and ready for production code.
**development** branch is used to develop your code with new features and bug fixes.
Additional branches can be used to for getting a better understanding of git workflow. 

### Kanban board
Kaban board can be found in the **Issue boards** menu. 
Kaban board will be used to track your progress on your project.
Kaban board have 6 tables:
* Open
* Doing
* Test
* Testing
* Ready to merge
* Closed

**Open** table is like a To-Do list where all of your tasks are kept.

**Doing** table is used to show which tasks are you doing now. All on going tasks must be moved from **Open** table.

**Test** table is used to keep tasks which must be tested by testing engineer, but are not tested yet.

**Testing** table is used to keep tasks which are on going on in testing. If the testing was succesfull, the task must be moved to **Ready to merge** table, if not, return to the **Doing** table to fix the bugs. Also the Testing engineer must to add a labal **Test failed** for the developer to understand that he must fix found bugs.

**Ready to merge** table is used to keep tasks which are waiting to be merged with the **main** branch, because all bug fixes and new features must be developed in the **development** branch.

**Closed** table is used to keep all done tasks which passed the testing phase and were succesfully merged into **main** branch.

## Other things

Do not forget to delete this information later in the process and document your project so that other developers or users will not struggle to use your project.

GL & HF
