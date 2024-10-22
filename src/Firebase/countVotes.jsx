import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const countVotes = async () => {
  const votesSnapshot = await getDocs(collection(db, 'votes'));
  const formSnapshot = await getDocs(collection(db, 'formulario'));
  const formData = formSnapshot.docs.map(doc => doc.data())[0]; // Assuming there's only one form

  const voteCounts = {};
  Object.keys(formData.sections).forEach(section => {
    voteCounts[section] = {
      title: formData.sections[section].title,
      options: {}
    };
    formData.sections[section].options.forEach(option => {
      voteCounts[section].options[option.text] = 0;
    });
  });

  votesSnapshot.forEach((doc) => {
    const data = doc.data();
    Object.keys(data.votes).forEach(section => {
      if (data.votes[section]) {
        voteCounts[section].options[data.votes[section]]++;
      }
    });
  });

  return voteCounts;
};

export default countVotes;