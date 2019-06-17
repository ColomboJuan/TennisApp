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

export async function createGroups(data){
    return await db
         .collection('groups')
         .doc()
         .set(data)
 }

export async function deleteGroups(id){
    return await db
         .collection('groups')
         .doc(id)
         .delete()
 }

export async function updateGroups(id,data){
    return await db
         .collection('groups')
         .doc(id)
         .update(data)
 }

 export async function createEvals(data){
    return await db
         .collection('evaluations')
         .doc()
         .set(data)
 }

export async function deleteEvals(id){
    return await db
         .collection('evaluations')
         .doc(id)
         .delete()
 }

export async function updateEvals(id,data){
    return await db
         .collection('evaluations')
         .doc(id)
         .update(data)
 }
 export async function createCoaches(data){
     return await db
          .collection('coaches')
          .doc()
          .set(data)
  }
 
 export async function deleteCoaches(id){
     return await db
          .collection('coaches')
          .doc(id)
          .delete()
  }
 
 export async function updateCoaches(id,data){
     return await db
          .collection('coaches')
          .doc(id)
          .update(data)
  }
  export async function createMatches(data){
     return await db
          .collection('matches')
          .doc()
          .set(data)
  }
 
 export async function deleteMatches(id){
     return await db
          .collection('matches')
          .doc(id)
          .delete()
  }
 
 export async function updateMatches(id,data){
     return await db
          .collection('matches')
          .doc(id)
          .update(data)
  }

  export async function createGroupsMatches(data){
     return await db
          .collection('groupsmatches')
          .doc()
          .set(data)
  }
 
 export async function deleteGroupsMatches(id){
     return await db
          .collection('groupsmatches')
          .doc(id)
          .delete()
  }
 
 export async function updateGroupsMatches(id,data){
     return await db
          .collection('groupsmatches')
          .doc(id)
          .update(data)
  }