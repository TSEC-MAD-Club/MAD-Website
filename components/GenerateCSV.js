import { collection, query, getDocs, where, doc, getDoc, writeBatch, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, getStorage } from 'firebase/storage';
import { db } from '../firebase';
import * as jsonexport from 'jsonexport';
import { toast } from "react-nextjs-toast";

const storage = getStorage();

const getUid = async (request) => {
    try {
        const concessionDetailsCollection = collection(db, 'ConcessionDetails');
        const detailsQuery = query(
            concessionDetailsCollection,
            where('firstName', '==', request.firstName),
            where('phoneNum', '==', request.phoneNum)
        );
        const detailsSnapshot = await getDocs(detailsQuery);

        let uid = ""

        if (!detailsSnapshot.empty) {
            const matchingDetailsDoc = detailsSnapshot.docs[0];
            uid = (matchingDetailsDoc.id);
        }
        return uid;
    } catch (error) {
        return null;
    }
}

const uploadCsvToStorage = async (csvContent, fileName) => {
    const storageRef = ref(storage, `csvFiles/${fileName}`);
    await uploadString(storageRef, csvContent, 'raw');
    return getDownloadURL(storageRef);
};

const getPassNumFromConcessionRequest = async (uid) => {
    try {
        const concessionRequestRef = collection(db, 'ConcessionRequest');
        const concessionRequestQuery = query(
            concessionRequestRef,
            where('uid', '==', uid)
        );

        const concessionRequestSnapshot = await getDocs(concessionRequestQuery);

        if (!concessionRequestSnapshot.empty) {
            const matchingRequestDoc = concessionRequestSnapshot.docs[0];
            const concessionRequestData = matchingRequestDoc.data();
            return concessionRequestData.passNum;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

const fetchAllEnquiries = async (travelLane) => {
    try {
        const concessionDetailsRef = collection(db, 'ConcessionDetails');
        const concessionRequestRef = collection(db, 'ConcessionRequest');
        const csvCollectionRef = collection(db, 'csvCollection');

        const servicedRequestsSnapshot = await getDocs(
            query(concessionRequestRef,
                where('status', '==', 'approved'),
                limit(100)
            )
        );

        const fetchedEnquiries = [];
        const fetchedPassNum = [];
        const batch = writeBatch(db);

        // Iterate through approved requests
        for (const requestDoc of servicedRequestsSnapshot.docs) {
            const concessionDetailsId = requestDoc.data().uid;

            if (concessionDetailsId) {
                const concessionDetailsDoc = await getDoc(
                    doc(concessionDetailsRef, concessionDetailsId)
                );

                if (!concessionDetailsDoc.exists()) {
                    toast.notify("No approved requests found.!!", { type: "error" });
                    return;
                }

                if (concessionDetailsDoc.exists() && concessionDetailsDoc.data().travelLane === travelLane) {
                    const enquiry = concessionDetailsDoc.data();
                    fetchedEnquiries.push(enquiry);
                    fetchedPassNum.push(concessionDetailsDoc.id);
                    batch.update(requestDoc.ref, { status: "downloaded" });
                }
            }
        }
        if (fetchedEnquiries.length === 0) {
            toast.notify("No approved requests found for this lane and status.", { type: "info" });
            return;
        }

        await batch.commit();

        const columnsToInclude = ['passNum', 'name', 'gender', 'from', 'to', 'class', 'duration', 'address'];
        const csvContent = await convertJsonToCsv(fetchedEnquiries, columnsToInclude);
        const firstName = await getPassNumFromConcessionRequest(fetchedPassNum[0])
        const lastName = await getPassNumFromConcessionRequest(fetchedPassNum[fetchedEnquiries.length - 1])
        const fileName = `${firstName}-${lastName}.csv`;

        const csvLink = await uploadCsvToStorage(csvContent, fileName);

        const csvDocRef = await addDoc(csvCollectionRef, {
            railway: travelLane,
            content: csvLink,
            fileName: fileName,
            firstName: firstName,
            lastName: lastName,
            timestamp: serverTimestamp(),
        });

        toast.notify("CSV file generated successfully.!!", { type: "success" });
        downloadCsv(csvContent, fileName);
    } catch (error) {
    }
};

const convertJsonToCsv = async (jsonData, columns) => {
    try {
        const enquiriesWithPassNum = await Promise.all(
            jsonData.map(async (enquiry) => {
                const uid = await getUid(enquiry);
                const passNum = await getPassNumFromConcessionRequest(uid);

                const name = [enquiry.firstName, enquiry.middleName, enquiry.lastName].filter(Boolean).join(' ');

                return { ...enquiry, passNum, name };
            })
        );

        // Filter only the properties present in the specified columns
        const filteredData = enquiriesWithPassNum.map((item) =>
            columns.reduce((acc, column) => {
                if (item[column] !== undefined) {
                    acc[column] = item[column];
                }
                return acc;
            }, {})
        );

        return new Promise((resolve, reject) => {
            jsonexport(filteredData, { headers: columns }, (err, csv) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(csv);
                }
            });
        });
    } catch (error) {
        return null;
    }
};

function downloadCsv(content, fileName) {
    const blob = new Blob([content], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}

export default fetchAllEnquiries;