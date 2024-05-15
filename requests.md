## Student

- getStudent [TEACHER]⚠️
- getStudentsByTeacher(paginated, filter by term(name/email), and verification) [TEACHER]
- inviteStudent [TEACHER]✅

## Class

- getClassesTemplates [TEACHER]✅
- getClassTemplate [TEACHER]✅
- createClassTemplate [TEACHER]✅
- updateClassTemplate [TEACHER]✅

- getStudentClasses (paginated, ordinated(asc/desc)) [STUDENT, TEACHER?]
- getStudentClass [STUDENT, TEACHER]✅
- createStudentClass [TEACHER]
- updateStudentClass [TEACHER]

- getTeacherClasses (filter by interval of time) [TEACHER]

## Homework

- getStudentHomework [STUDENT, TEACHER]
- getStudentHomeworks (paginated, ordinated(asc/desc)) [STUDENT, TEACHER]
- createStudentHomework [TEACHER]
- updateStudentHomework [TEACHER]
- deleteStudentHomework [TEACHER]

- getHomeworkTemplate [TEACHER]✅
- getHoweworkTemplates [TEACHER]✅
- createHomeworkTemplate [TEACHER]✅
- updateHomeworkTemplate [TEACHER]✅
- deleteHomeworkTemplate [TEACHER]
