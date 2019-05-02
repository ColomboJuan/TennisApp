import {db} from './setup'

export async function createStudents(data){
    return await db
         .collection('students')
         .doc()
         .set(data)
}

export async function deleteStudents(id){
    return await db
         .collection('students')
         .doc(id)
         .delete()
}

export async function updateStudents(id,data){
    return await db
         .collection('students')
         .doc(id)
         .update(data)
}