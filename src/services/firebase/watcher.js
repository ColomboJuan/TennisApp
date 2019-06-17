import { auth, db } from './setup';

export function watchUserChanges(callback) {
    const unsub = auth.onAuthStateChanged((user) => {
        if (user && !user.isAnonymous) {
            const {
                uid,
                email,
                displayName,
            } = user

            callback({
                id: uid,
                email,
                displayName,
            });
        } else {
            callback(null);
        }
    });

    return unsub;
}

export function watchStudents(callback) {
    const unsub = db
        .collection('students')
        .onSnapshot((snapshot) => {
            const docs = [];

            snapshot.forEach((doc) => {
                const data = doc.data();
                docs.push({
                    ...data,
                  id: doc.id,
                 });
            });

            callback(docs);
        });

    return unsub;
}

export function watchGroups(callback) {
    const unsub = db
        .collection('groups')
        .onSnapshot((snapshot) => {
            const docs = [];

            snapshot.forEach((doc) => {
                const data = doc.data();

                docs.push({
                    ...data,
                  id: doc.id,
                 });
            });
          callback(docs);
        });

    return unsub;
}

export function watchEvals(callback) {
    const unsub = db
        .collection('evaluations')
        .onSnapshot((snapshot) => {
            const docs = [];

            snapshot.forEach((doc) => {
                const data = doc.data();

                docs.push({
                    ...data,
                  id: doc.id,
                 });
            });
          callback(docs);
        });

    return unsub;
}

export function watchCoaches(callback) {
    const unsub = db
        .collection('coaches')
        .onSnapshot((snapshot) => {
            const docs = [];

            snapshot.forEach((doc) => {
                const data = doc.data();

                docs.push({
                    ...data,
                  id: doc.id,
                 });
            });
          callback(docs);
        });

    return unsub;
    
}

export function watchMatches(callback) {
    const unsub = db
        .collection('matches')
        .onSnapshot((snapshot) => {
            const docs = [];

            snapshot.forEach((doc) => {
                const data = doc.data();

                docs.push({
                    ...data,
                  id: doc.id,
                 });
            });
          callback(docs);
        });

    return unsub;
}